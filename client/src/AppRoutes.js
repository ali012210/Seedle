import React from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import PostCreationPage from './pages/PostCreationPage';
import UserProfileEdit from './pages/UserProfileEdit';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostViewPage from './pages/PostViewPage';
import UserOverview from './pages/UserOverview';
import PrivateRoute from './components/PrivateRoute'; // A component for handling private routes

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact component={HomePage} />
                <PrivateRoute path="/user/:userID" component={UserOverview} />
                <PrivateRoute path="/post/new" component={PostCreationPage} />
                <PrivateRoute path="/profile" exact component={UserProfile} />
                <PrivateRoute path="/profile/edit" component={UserProfileEdit} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/:postID/comments" component={PostViewPage} />
                <Redirect to="/" />
            </Routes>
        </Router>
    );
};

export default AppRoutes;