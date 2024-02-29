import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // For redirecting after login

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // To redirect user after login

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page refresh/form submission
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save the token in localStorage
                localStorage.setItem('token', data.token); // store the token in localStorage
                history.push('/'); // Redirect to home page
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;