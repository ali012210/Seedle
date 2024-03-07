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
  return response.data; // This might be empty depending on your API's implementation
};

// Fetch a single post by ID
export const fetchPostById = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

// Like (seed) a post
export const likePost = async (postId) => {
  // Assuming your API expects a POST request to like a post and tracks likes server-side
  const response = await axiosInstance.post(`/posts/${postId}/like`);
  return response.data; // Update according to your API response structure
};

// Unlike (remove seed from) a post
export const unlikePost = async (postId) => {
  // Assuming your API expects a POST request to unlike a post
  const response = await axiosInstance.post(`/posts/${postId}/unlike`);
  return response.data; // Update according to your API response structure
};


