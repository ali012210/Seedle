import axios from 'axios';

// Base URL of your API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const USERS_ENDPOINT = '/users';

// Creating an Axios instance for user profile requests
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}${USERS_ENDPOINT}`,
});

// Append Authorization token to every request if needed
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const userOverviewService = {
  // Fetch a user's public profile by their ID
  fetchUserOverview: async (userId) => {
    try {
      const response = await axiosInstance.get(`/${userId}`);
      return response.data; 
    } catch (error) {
      throw error.response.data;
    }
  },

  // Fetch posts created by the user
  fetchUserPosts: async (userId) => {
    try {
      const response = await axiosInstance.get(`/${userId}/posts`);
      return response.data; 
    } catch (error) {
      throw error.response.data;
    }
  },

  // Fetch comments made by the user
  fetchUserComments: async (userId) => {
    try {
      const response = await axiosInstance.get(`/${userId}/comments`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

