import axios from 'axios';

// Base URL for your API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const COMMENTS_ENDPOINT = '/comments';

// Creating an axios instance for comments service
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}${COMMENTS_ENDPOINT}`,
});

// Interceptor to append Authorization token to request headers, for protected routes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const commentsService = {
  // Fetch comments by post ID
  fetchCommentsByPostId: async (postId) => {
    try {
      const response = await axiosInstance.get(`/post/${postId}`);
      return response.data; // Assuming data contains an array of comments for the post
    } catch (error) {
      throw error.response.data;
    }
  },

  // Create a new comment for a post
  createComment: async (postId, commentData) => {
    try {
      const response = await axiosInstance.post(`/`, { ...commentData, postId });
      return response.data; // Assuming data contains the created comment object
    } catch (error) {
      throw error.response.data;
    }
  },

  // Update an existing comment
  updateComment: async (commentId, updateData) => {
    try {
      const response = await axiosInstance.put(`/${commentId}`, updateData);
      return response.data; // Assuming data contains the updated comment object
    } catch (error) {
      throw error.response.data;
    }
  },

  // Delete a comment
  deleteComment: async (commentId) => {
    try {
      const response = await axiosInstance.delete(`/${commentId}`);
      return response.data; // Assuming data contains some success indicator
    } catch (error) {
      throw error.response.data;
    }
  },

  // Additional functionality as required for your project
  // For example, liking a comment, replying to a comment etc.
};