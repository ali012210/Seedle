import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav> 
            {/* Additional navigation links here as needed*/}
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;