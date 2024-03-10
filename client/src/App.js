import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, useNavigate} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProfileProvider } from './context/UserProfileContext';
import { PostsProvider } from './context/PostsContext';
import { CommentsProvider } from './context/CommentsContext';
import { TagsProvider } from './context/TagsContext';
import { UIProvider } from './context/UIContext';
import AppRoutes from './AppRoutes';
import { isTokenExpired } from './authUtils';
import { UserOverviewProvider } from './context/UserOverviewContext';

const App = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token'); 

      if (token && isTokenExpired(token)) {
        // Token has expired
        alert('Your session has expired. Please login again.');
        // Perform logout by clearing the token from localStorage and redirect to login page
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page
      }
    };

    // Check token expiry on app load
    checkAuth();
    // Set an interval to check token expiry periodically
    const intervalId = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [navigate]); // Include navigate as a dependency

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
          <UserProfileProvider>
            <UserOverviewProvider>
              <UIProvider>
                <TagsProvider>
                  <PostsProvider>
                    <CommentsProvider> {/* Add CommentsProvider here */}
                      <App />
                   </CommentsProvider>
                  </PostsProvider>
                </TagsProvider>
              </UIProvider>
            </UserOverviewProvider>
          </UserProfileProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppWrapper;