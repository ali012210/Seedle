import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PostsProvider } from './context/PostsContext';
import AppRoutes from './AppRoutes';
import { isTokenExpired } from './authUtils';


function App() {

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token'); // Assuming you are using localStorage for storing your token

      if (token && isTokenExpired(token)) {
        // Token has expired
        alert('Your session has expired. Please login again.');
        // Perform logout by clearing the token from localStorage and redirect to login page
        localStorage.removeItem('token');

        // Redirect to login page
      }
    };

    // Check token expiry on app load
    checkAuth();
    // Set an interval to check token expiry periodically
    const intervalId = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <PostsProvider>
            <div className="App">
              <AppRoutes/>
            </div>
          </PostsProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
