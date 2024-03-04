import React, { useContext, useEffect, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { PostsContext } from '../context/PostsContext';
import Post from './Post';

const PostsList = () => {
    const { state, dispatch } = useContext(PostsContext);
    const { posts, hasMore, isLoading } = state;

    // Function to simulate fetching posts from an API
    const fetchMorePosts = useCallback(async () => {
        if (isLoading || !hasMore) return; // Prevent fetching if already loading or no more posts to fetch

        dispatch({ type: 'START_LOADING' });

        try {
            // Simulate an API Call
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10'); // Adjust fetching logic as needed
            const newData = await response.json();

            dispatch({
                type: 'FETCH_POSTS',
                payload: {
                    posts: newData, // Assuming the response directly contains an array of posts
                    hasMore: newData.length === 10, // Example condition to determine if more posts are available
                },
            });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: 'Failed to fetch posts' });
        }
    }, [dispatch, isLoading, hasMore]);

    useEffect(() => {
        fetchMorePosts(); // Initial fetch when the component mounts
    }, [fetchMorePosts]);

    // Function to render each row
    const Row = ({ index, style }) => (
        <div style={style}>
            <Post post={posts[index]} />
        </div>
    );

    // Handle scroll event to fetch more posts
    const handleScroll = ({scrollOffset, scrollUpdateWasRequested}) => {
        if (!scrollUpdateWasRequested && hasMore && !isLoading && scrollOffset > 0.9 * posts.length * 100) {
            fetchMorePosts();
        }
    };

    return (
        <AutoSizer>
            {({ height, width }) => (
                <List
                    height={height}
                    itemCount={posts.length}
                    itemSize={160}
                    width={width}
                    onScroll={handleScroll}
                >
                    {Row}
                </List>
            )}
        </AutoSizer>
    );
};

export default PostsList;