import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentsContext } from '../context/CommentsContext';
import Comment from './Comment'; // Assume a Comment component exists for individual comments
import './CommentList.css'; // Assuming you have CSS for styling

const CommentList = () => {
  const { postId } = useParams(); // Assuming you're using React Router and postId is part of the URL
  const { fetchCommentsForPost } = useContext(CommentsContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      try {
        const fetchedComments = await fetchCommentsForPost(postId);
        setComments(fetchedComments);
      } catch (err) {
        setError('Failed to load comments. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [postId, fetchCommentsForPost]);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (comments.length === 0) return <p>No comments yet. Be the first to comment!</p>;

  return (
    <div className="comment-list">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
