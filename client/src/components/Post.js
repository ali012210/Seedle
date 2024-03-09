import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PostsContext } from '../context/PostsContext';
import { formatDate } from '../utils/formatDate.js'; // A utility function to format dates
import './Post.css'; // Assuming you have some CSS for styling

const Post = ({ post }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { likePost, unlikePost } = useContext(PostsContext);
  const isLiked = post.isLiked || false; // Assuming `post` has an `isLiked` field

  const handleLike = async () => {
    if (isAuthenticated) {
      isLiked ? await unlikePost(post.id) : await likePost(post.id);
      // Optionally trigger a state update to reflect the like status in the UI
    } else {
      alert('Please log in to like posts.');
    }
  };

  return (
    <div className="post-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <span className="post-author">Posted by <Link to={`/user/${post.author.id}`}>{post.author.username}</Link></span>
        <span className="post-date">{formatDate(post.createdAt)}</span>
        <button onClick={handleLike} className={isLiked ? 'liked' : ''}>
          Seed {isLiked ? '✓' : ''}
        </button>
        <span className="seeds-count">{post.seeds} Seeds</span>
        <Link to={`/post/${post.id}/comments`} className="comments-link">
          View Comments ({post.commentCount})
        </Link>
      </div>
    </div>
  );
};

export default Post;
