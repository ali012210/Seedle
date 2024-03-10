import React, { useState, useContext} from 'react';
import { PostsContext } from '../context/PostsContext';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const { dispatch } = useContext(PostsContext);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!content.trim()) {
            alert('Post content cannot be empty');
            return;
        }

        const newPost = {
            id: Date.now(), // Simple ID generation
            content,
            seeds: 0, // Initial seeds (like) count for new posts
            commentCount: 0, // Initial comment count for new posts
        };

        // Dispatch action to add new post to global state
        dispatch({ type: 'ADD_POST', payload: newPost });

        // Clear the form
        setContent('');
    };

    return (
        <div className="create-post">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Any thoughts to plant?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CreatePost;