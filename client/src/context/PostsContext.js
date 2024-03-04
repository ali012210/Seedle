import React, { createContext, useReducer } from 'react';
import { postsReducer } from './postsReducer';

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
    hasMore: true,
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, initialState);

    return (
        <PostsContext.Provider value={{ state, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
}