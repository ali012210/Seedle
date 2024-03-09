import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import PostCreationPage from './pages/PostCreationPage';
import UserProfileEdit from './pages/UserProfileEdit';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostViewPage from './pages/PostViewPage';
import UserOverview from './pages/UserOverview';
import PrivateRoute from './components/PrivateRoute'; // Ensure PrivateRoute is adapted for react-router-dom v6

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user/:userID" element={<PrivateRoute><UserOverview /></PrivateRoute>} />
                <Route path="/post/new" element={<PrivateRoute><PostCreationPage /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                <Route path="/profile/edit" element={<PrivateRoute><UserProfileEdit /></PrivateRoute>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/:postID/comments" element={<PostViewPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
