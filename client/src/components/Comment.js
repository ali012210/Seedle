import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { formatDate } from '../utils/formatDate'; // Assuming a utility function for date formatting
import './Comment.css'; // Assuming you have CSS for styling

const Comment = ({ comment }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Function to handle liking a comment
  const handleLikeComment = async () => {
    if (!isAuthenticated) {
      alert('Please log in to like comments.');
      return;
    }

    // Implement like functionality here
    // This could involve calling a function from a context or service
    // that interacts with your backend to like the comment.
    console.log('Liking comment not implemented');
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{comment.author}</span>
        <span className="comment-date">{formatDate(comment.createdAt)}</span>
      </div>
      <p className="comment-content">{comment.content}</p>
      <div className="comment-actions">
        <button onClick={handleLikeComment}>Seed</button>
        <span className="comment-seeds">{comment.seeds} Seeds</span>
      </div>
    </div>
  );
};

export default Comment;
