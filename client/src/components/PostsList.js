import React, { useContext, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostsContext } from '../context/PostsContext';
import Post from './Post';

const PostsList = () => {
    const { state, dispatch } = useContext(PostsContext);
    const { posts, hasMore, isLoading } = state;

    // Function to simulate fetching posts from an API
    const fetchMorePosts = useCallback(async () => {
        dispatch({ type: 'START_LOADING' });

        try {
            // Simulate an API call
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_page=2&_limit=10'); // Use the actual API endpoint here
            const newData = await response.json();

            dispatch({
                type: 'FETCH_POSTS',
                payload: {
                   posts: newData.posts,
                   hasMore: newData.hasMore,
                },
            });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: 'Failed to fetch posts' });
        }
    }, [dispatch]);

    useEffect(() => {
        if (posts.length === 0 && !isLoading) {
            fetchMorePosts(); // initial fetch
        }
    }, [posts, isLoading, fetchMorePosts]); // Include fetchMorePosts in the dependency array

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>You've seen it all!</b>
                </p>
            }
        >
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </InfiniteScroll>
    );
};

export default PostsList;