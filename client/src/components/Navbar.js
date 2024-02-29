import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        history.push('/login'); // Redirect to login page
    };

    return (
        <nav> 
            {/* Additional navigation links here as needed*/}
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;