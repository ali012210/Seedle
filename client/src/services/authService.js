import axios from "axios";

// Base URL of the API

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";
const AUTH_ENDPOINT = '/auth';

// Configuring Axios instance for authentication requests
const axiosAuth = axios.create({
    baseURL: `${API_BASE_URL}${AUTH_ENDPOINT}`,
});

// Handling response to extract and store authentication token
const handleAuthResponse = (response) => {
    if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
};

export const authService = {
    // User registration
    register: async (userData) => {
        try {
            const response = await axiosAuth.post('/register', userData);
            return handleAuthResponse(response);
        } catch (error) {
            // Handle errors (e.g., user already exists, invalid data, etc.)
            throw error.response.data;
        }
    },

    // User login
    login: async (username, password) => {
        try {
            const response = await axiosAuth.post('/login', { username, password });
            return handleAuthResponse(response);
        } catch (error) {
            // Handle errors (e.g., invalid credentials, account not found, etc.)
            throw error.response.data;
        }
    },

    // User logout
    logout: () => {
        // Clear the token from localStorage
        localStorage.removeItem('userToken');
        // Redirect to login page
    },

    // Fetch current user profile using the stored token
    fetchCurrentUser: async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) throw new Error('No token found');

            // Optionally set the token in the header for this request
            const response = await axios.get(`${API_BASE_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // Return user data
            return response.data;
        } catch (error) {
            // Handle errors (e.g., token expired, user not found, etc.)
            throw error.response.data;
        }
    },

    // Check if the user is logged in by checking the presence of a token
    isLoggedIn: () => {
        const token = localStorage.getItem('userToken');
        return !!token; // Returns true if a token is present, false otherwise
    },
};

