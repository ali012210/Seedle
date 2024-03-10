import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const PROFILE_ENDPOINT = '/profile'; 

// Creating an Axios instance for user profile requests
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}${PROFILE_ENDPOINT}`,
});

// Ensure to send the Authorization token with each request
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const userProfileService = {
  // Fetch the current user's profile details
  fetchUserProfile: async () => {
    try {
      const response = await axiosInstance.get('/me'); 
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Update the current user's profile details
  updateUserProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/me/update', profileData); 
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Update the current user's profile picture
  updateUserProfilePicture: async (formData) => {
    try {
      const response = await axiosInstance.post('/me/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

