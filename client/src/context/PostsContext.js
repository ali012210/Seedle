import React, { createContext, useReducer } from 'react';

const postsReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                posts: [...state.posts, ...action.payload.posts],
                hasMore: action.payload.hasMore,
                isLoading: false,
            };
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case 'LIKE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post.id === action.payload.postId ? { ...post, seeds: post.seeds + 1 } : post
                ),
            };
        case 'UNLIKE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post.id === action.payload.postId ? { ...post, seeds: Math.max(post.seeds - 1, 0) } : post
                ),
            };
        case 'INCREMENT_COMMENT_COUNT':
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post.id === action.payload.postId ? { ...post, commentCount: post.commentCount + 1 } : post
                ),
            };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    posts: [],
    isLoading: false,
    error: null,
    hasMore: true,
};

// Create the context with the initial state
export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, initialState);

    // Define any actions you need to dispatch from your components
    // For example, fetching posts, liking/unliking posts, etc.
    // These can be implemented as functions here and passed down via the context

    return (
        <PostsContext.Provider value={{ state, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
};

// Custom hook to use the posts context
export const usePosts = () => React.useContext(PostsContext);
