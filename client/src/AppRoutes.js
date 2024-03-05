import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsList from './components/PostsList';

const AppRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={PostsList} />
            {/* Add more routes here */}
        </Switch>
    );
};

export default AppRoutes;