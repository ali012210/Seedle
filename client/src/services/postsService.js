import axiosInstance from './axiosConfig';


// Fetch posts with pagination
export const fetchPosts = async (start = 0, limit = 10) => {
  const response = await axiosInstance.get('/posts', {
    params: { _start: start, _limit: limit },
  });
  return response.data;
};

// Create a new post
export const createPost = async (postData) => {
  const response = await axiosInstance.post('/posts', postData);
  return response.data;
};

// Update an existing post
export const updatePost = async (postId, postData) => {
  const response = await axiosInstance.put(`/posts/${postId}`, postData);
  return response.data;
};

// Delete a post
export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data; 
};

// Fetch a single post by ID
export const fetchPostById = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

// Like (seed) a post
export const likePost = async (postId) => {
  const response = await axiosInstance.post(`/posts/${postId}/like`);
  return response.data; 
};

// Unlike (remove seed from) a post
export const unlikePost = async (postId) => {
  const response = await axiosInstance.post(`/posts/${postId}/unlike`);
  return response.data; 
};


