import axios from 'axios';

// Axios configuration with the base URL of posts API endpoint
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const POSTS_ENDPOINT = '/posts';

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}${POSTS_ENDPOINT}`,
});

// Optionally configure Axios to include authorisation token in all request headers which would be necessary for protected routes/endpoints
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const postsService = {
    // Fetch all posts
    fetchPosts: async () => {
        try {
            const response = await axiosInstance.get('/');
            return response.data; // Assuming the response directly contains an array of posts
        } catch (error) {
            throw error.response.data;
        }
    },

    // Fetch a single post by ID
    fetchPostById: async (postId) => {
        try {
            const response = await axiosInstance.get(`/${postId}`);
            return response.data; // Assuming the response directly contains the post object
        } catch (error) {
            throw error.response.data;
        }
    },

    // Create a new post
    createPost: async (postData) => {
        try {
            const response = await axiosInstance.post('/', postData);
            return response.data; // Assuming the response directly contains the new post object
        } catch (error) {
            throw error.response.data;
        }
    },

    // Update an existing post
    updatePost: async (postId, updateData) => {
        try {
            const response = await axiosInstance.put(`/${postId}`, updateData);
            return response.data; // Assuming the response directly contains the updated post object
        } catch (error) {
            throw error.response.data;
        }
    },

    // Delete a post
    deletePost: async (postId) => {
        try {
            const response = await axiosInstance.delete(`/${postId}`);
            return response.data; // Assuming the response directly contains a success message
        } catch (error) {
            throw error.response.data;
        }
    },

    // Like (seed) a post
    likePost: async (postId) => {
        try {
            const response = await axiosInstance.post(`/${postId}/like`);
            return response.data; // Assuming the response updates the post's seeds
        } catch (error) {
            throw error.response.data;
        }
    },

    // Unlike (unseed) a post
    unlikePost: async (postId) => {
        try {
            const response = await axiosInstance.post(`/${postId}/unlike`);
            return response.data; // Assuming the response updates the post's seeds
        } catch (error) {
            throw error.response.data;
        }
    },

    // Additional functionalities as needed
};