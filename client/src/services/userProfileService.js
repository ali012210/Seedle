import axios from 'axios';

// Assuming the base URL of your API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const PROFILE_ENDPOINT = '/profile'; // Adjust if your API uses a different endpoint

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
      const response = await axiosInstance.get('/me'); // Adjust endpoint as necessary
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Update the current user's profile details
  updateUserProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/me/update', profileData); // Adjust endpoint as necessary
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Update the current user's profile picture
  updateUserProfilePicture: async (formData) => {
    try {
      // Assuming the API expects form data for file upload
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

  // Additional functionalities as needed for your application, such as:
  // - Changing password
  // - Adding or removing plants from the user's owned plants list
  // - Deleting the user account
};

