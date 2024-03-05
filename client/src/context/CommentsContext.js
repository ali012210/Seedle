import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state for comments
const initialState = {
    comments: [], // Array of comments for the selected post
    isLoading: false, // Loading state for fetching comments
    error: null, // Error state for handling errors
};

// Create the context
export const CommentsContext = createContext(initialState);

// Define a reducer function to handle actions
const actions = {
    FETCH_COMMENTS_START: 'FETCH_COMMENTS_START',
    FETCH_COMMENTS_SUCCESS: 'FETCH_COMMENTS_SUCCESS',
    FETCH_COMMENTS_FAILURE: 'FETCH_COMMENTS_FAILURE',
    ADD_COMMENT: 'ADD_COMMENT',
    EDIT_COMMENT: 'EDIT_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
};

// Define the reducer function
const commentsReducer = (state, action) => {
    switch (action.type) {
        case actions.FETCH_COMMENTS_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case actions.FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                isLoading: false,
            };
        case actions.FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case actions.ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        case actions.EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment) =>
                    comment.id === action.payload.id ? action.payload : comment
                ),
            };
        case actions.DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(
                    (comment) => comment.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

// Create the context provider
export const CommentsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(commentsReducer, initialState);

    // Actions creators to be used by consuming components
    const fetchCommentsStart = () => dispatch({ type: actions.FETCH_COMMENTS_START });
    const fetchCommentsSuccess = (comments) => dispatch({ type: actions.FETCH_COMMENTS_SUCCESS, payload: comments });
    const fetchCommentsFailure = (error) => dispatch({ type: actions.FETCH_COMMENTS_FAILURE, payload: error });
    const addComment = (comment) => dispatch({ type: actions.ADD_COMMENT, payload: comment });
    const editComment = (comment) => dispatch({ type: actions.EDIT_COMMENT, payload: comment });
    const deleteComment = (commentId) => dispatch({ type: actions.DELETE_COMMENT, payload: commentId });

    return (
        <CommentsContext.Provider
            value={{
                ...state,
                fetchCommentsStart,
                fetchCommentsSuccess,
                fetchCommentsFailure,
                addComment,
                editComment,
                deleteComment,
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

// Custom hook to consume the comments context
export const useComments = () => useContext(CommentsContext);