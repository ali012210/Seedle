import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CommentsContext } from '../context/CommentsContext';
import { AuthContext } from '../context/AuthContext';
import './CreateCommentForm.css'; // Assuming you have CSS for styling

const CreateCommentForm = () => {
  const [comment, setComment] = useState('');
  const { addComment } = useContext(CommentsContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { postId } = useParams(); // Assuming this component is used where postId is in the URL
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    if (!isAuthenticated) {
      setError('You must be logged in to post a comment.');
      return;
    }

    try {
      await addComment(postId, { content: comment });
      setComment(''); // Reset comment field on successful submission
      setError(''); // Clear any existing errors
    } catch (err) {
      setError('Failed to post comment. Please try again.');
      console.error('Error posting comment:', err);
    }
  };

  return (
    <div className="create-comment-form">
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={!isAuthenticated}>Post Comment</button>
      </form>
    </div>
  );
};

export default CreateCommentForm;
