import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Post = ({ post }) => {
    const { isAuthenticated } = useContext(AuthContext); // To check if the user is authenticated

    // Placeholder function for liking a post
    const handleLike = () => {
        console.log('Like post', post.id);
        // Here, you can make an API call to like the post or dispatch an action to update the state
    };

    // Placeholder function for navigating to post comments
    const navigateToComments = () => {
        console.log('Navigate to comments for post', post.id);
        // Implement navigation logic, perhaps using React Router's `useHistory` hook
    };

    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="post-meta">
                <span>{post.seeds} Seeds</span>
                <span onClick={navigateToComments} style={{ cursor: 'pointer' }}>
                    {post.commentCount} Comments
                </span>
            </div>
            {isAuthenticated && (
                <div className="post-actions">
                    <button onClick={handleLike}>Like</button>
                    <button onClick={navigateToComments}>Comment</button>
                </div>
            )}
        </div>
    );
};

export default Post;