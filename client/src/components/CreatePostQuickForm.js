import React, { useState, useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { useNavigate } from 'react-router-dom'; // For redirecting after post creation

const CreatePostQuickForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const { addPost } = useContext(PostsContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Title and content are required.');
      return;
    }

    try {
      // Call the context method to add a new post
      await addPost({ title, content, tag });
      setTitle('');
      setContent('');
      setTag('');
      navigate('/'); // Redirect to the homepage or a desired route after successful post creation
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <form className="create-post-quick-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="tag">Tag:</label>
        <select
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
        >
          <option value="">Select a tag</option>
          {/* Dynamically list options based on available tags */}
          <option value="Gardening">Gardening</option>
          <option value="HousePlants">House Plants</option>
        </select>
      </div>
      <button type="submit" className="submit-btn">
        Post
      </button>
    </form>
  );
};

export default CreatePostQuickForm;
