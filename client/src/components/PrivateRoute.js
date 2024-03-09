import React, { useContext, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Adjust the import path according to your project structure

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext); // Use your AuthContext to determine if the user is authenticated

function RedirectToLogin() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null;
};

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <RedirectToLogin />}
    />
  ); 
};

export default PrivateRoute;
