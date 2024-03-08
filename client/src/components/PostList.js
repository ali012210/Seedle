import React, { useContext, useEffect, useState, useCallback } from 'react';
import { PostsContext } from '../context/PostsContext';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import './PostList.css'; // Assuming you have some CSS for styling

const PostList = () => {
  const { posts, fetchMorePosts, hasMore, isLoading } = useContext(PostsContext);
  const [page, setPage] = useState(0);
  const postsPerPage = 10; // Adjust based on your preference

  // Function to handle fetching more posts
  const loadMorePosts = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page count to fetch next set of posts
      fetchMorePosts(posts.length, postsPerPage); // Assuming your context provides this function
    }
  }, [fetchMorePosts, isLoading, hasMore, posts.length]);

  // Initially load posts
  useEffect(() => {
    fetchMorePosts(0, postsPerPage);
  }, [fetchMorePosts]);

  return (
    <div id="scrollableDiv" className="post-list-container">
      <InfiniteScroll
        dataLength={posts.length} // This is important field to render the next data
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      {isLoading && <div>Loading more posts...</div>}
    </div>
  );
};

export default PostList;
