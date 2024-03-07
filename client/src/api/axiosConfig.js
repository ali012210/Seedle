// src/api/axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    // Set the base URL for all requests made using this instance
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // Update with your actual API base URL
    // Default headers for all requests
    headers: {
        'Content-Type': 'application/json', // Assuming JSON for all requests
        // Any other default headers
    },
});

// Request interceptor for adding authorization token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Try to get the auth token from localStorage
    const token = localStorage.getItem('userToken');
    if (token) {
      // If the token exists, append it to the request headers
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor for handling global response tasks, like logging out on 401
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle global errors, for example:
    if (error.response && error.response.status === 401) {
      // Redirect to login page, clear localStorage, or perform other logout actions
      console.log("Unauthorized access detected. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
