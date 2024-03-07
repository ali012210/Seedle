import React, { useContext, useEffect, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { PostsContext } from '../context/PostsContext';
import { fetchPosts } from '../services/postsService'; // Import the service
import Post from './Post';

const PostsList = () => {
    const { state, dispatch } = useContext(PostsContext);
    const { posts, hasMore, isLoading } = state;

    const fetchMorePosts = useCallback(async () => {
        if (isLoading || !hasMore) return;

        dispatch({ type: 'START_LOADING' });

        try {
            // Use fetchPosts from postsService
            const newData = await fetchPosts(posts.length);
            dispatch({
                type: 'FETCH_POSTS',
                payload: {
                    posts: [...posts, ...newData],
                    hasMore: newData.length === 10,
                },
            });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: 'Failed to fetch posts' });
        }
    }, [dispatch, isLoading, hasMore, posts]); // Remove 'posts.length' from the dependency array

    useEffect(() => {
        fetchMorePosts();
    }, [fetchMorePosts]);

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
                    itemSize={160} // Adjust based on your post item size
                    width={width}
                    onScroll= {handleScroll}
                >
                    {Row}
                </List>
            )}
        </AutoSizer>
    );
};

export default PostsList;