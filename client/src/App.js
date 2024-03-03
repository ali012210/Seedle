import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { isTokenExpired } from './authUtils';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './AppRoutes';

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
    <div className="App">
      <AppRoutes/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );


}

export default App;
