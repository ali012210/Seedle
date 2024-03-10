import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsContext } from '../context/PostsContext';
import { TagsContext } from '../context/TagsContext';
import './CreatePostForm.css'; 

const CreatePostForm = () => {
  const { addPost } = useContext(PostsContext);
  const { tags } = useContext(TagsContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setErrorMessage('Title and content are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', JSON.stringify(selectedTags));
    if (image) {
      formData.append('image', image);
    }

    try {
      await addPost(formData); 
      navigate('/'); // Redirect to the homepage or desired path after successful post creation
    } catch (error) {
      console.error('Error creating post:', error);
      setErrorMessage('Failed to create post. Please try again.');
    }
  };

  const handleTagSelection = (tag) => {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="create-post-form">
      <h2>Create a New Post</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tags</label>
          <div className="tags-selection">
            {tags.map((tag) => (
              <div key={tag} className="tag-option">
                <input
                  type="checkbox"
                  id={`tag-${tag}`}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagSelection(tag)}
                />
                <label htmlFor={`tag-${tag}`}>{tag}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image (optional)</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="submit-button">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
