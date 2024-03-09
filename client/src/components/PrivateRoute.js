import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Adjust the import path according to your project structure

// Children is the component that PrivateRoute will render if the user is authenticated
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Use your AuthContext to determine if the user is authenticated
  let location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that location after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; 
};

export default PrivateRoute;