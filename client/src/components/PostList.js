import React, { useContext, useEffect, useCallback } from 'react';
import { PostsContext } from '../context/PostsContext';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import './PostList.css'; 

const PostList = () => {
  const { posts, fetchMorePosts, hasMore, isLoading } = useContext(PostsContext);
const postsPerPage = 10; // Adjust based on your preference. For now I believe 10 is a good number

// Function to handle fetching more posts
const loadMorePosts = useCallback(() => {
    if (!isLoading && hasMore) {
        fetchMorePosts(posts.length, postsPerPage); 
    }
}, [fetchMorePosts, isLoading, hasMore, posts.length]);

// Initially load posts
useEffect(() => {
    fetchMorePosts(0, postsPerPage);
}, [fetchMorePosts]);

  return (
    <div id="scrollableDiv" className="post-list-container">
      <InfiniteScroll
        dataLength={posts.length} // Field to render the next data
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
