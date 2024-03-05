import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, useHistory} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PostsProvider } from './context/PostsContext';
import AppRoutes from './AppRoutes';
import { isTokenExpired } from './authUtils';

const App = () => {
  let history = useHistory();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token'); // Assuming you are using localStorage for storing your token

      if (token && isTokenExpired(token)) {
        // Token has expired
        alert('Your session has expired. Please login again.');
        // Perform logout by clearing the token from localStorage and redirect to login page
        localStorage.removeItem('token');
        history.push('/login'); // Redirect to login page
      }
    };

    // Check token expiry on app load
    checkAuth();
    // Set an interval to check token expiry periodically
    const intervalId = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [history]); // Ensure to include history as a dependency

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppWrapper;
