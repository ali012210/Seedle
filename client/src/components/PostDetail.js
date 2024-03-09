import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostsContext } from '../context/PostsContext';
import { AuthContext } from '../context/AuthContext';

// import { CommentsContext } from '../context/CommentsContext';
import CommentList from './CommentList'; // Component to list comments
import CreateCommentForm from './CreateCommentForm'; // Form to add a new comment
import { formatDate } from '../utils/formatDate.js'; // Assume this function exists for formatting dates
import './PostDetail.css'; // Your CSS for styling

const PostDetail = () => {
  const { postId } = useParams();
  const { fetchPostById, likePost, unlikePost } = useContext(PostsContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const fetchedPost = await fetchPostById(postId);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post details:', error);
        // Handle error (e.g., redirecting to an error page or displaying a message)
      }
    };

    loadPost();
  }, [postId, fetchPostById]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please log in to like posts.');
      return;
    }

    try {
      const updatedPost = post.isLiked ? await unlikePost(postId) : await likePost(postId);
      setPost({ ...post, ...updatedPost }); // Update the local state with the new like status
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      // Handle error
    }
  };

  if (!post) return <div>Loading post...</div>; // Show loading state while post is being fetched

  return (
    <div className="post-detail-container">
      <h1>{post.title}</h1>
      <div className="post-metadata">
        <span>By: <Link to={`/user/${post.author.id}`}>{post.author.username}</Link></span>
        <span>On: {formatDate(post.createdAt)}</span>
      </div>
      <p>{post.content}</p>
      <div className="post-actions">
        <button onClick={handleLike}>{post.isLiked ? 'Unlike' : 'Like'} Post</button>
        <span>{post.seeds} Seeds</span>
      </div>
      <hr />
      {isAuthenticated && <CreateCommentForm postId={postId} />}
      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetail;
