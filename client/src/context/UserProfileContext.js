import React, {createContext, useContext, useReducer, useCallback} from 'react';

// Context definition
export const UserProfileContext = createContext();

// Initial state
const initialState = {
    user: null, // Stores user profile data
    isLoading: false, // Tracks loading state for async operations
    error: null, // Handles errors
};

// Action types
const actionTypes = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',
    UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer function to manage state transitions
const userProfileReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FETCH_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case actionTypes.FETCH_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            };
        case actionTypes.FETCH_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case actionTypes.UPDATE_USER_PROFILE:
            return {
                ...state,
                user: { ...state.user, ...action.payload }, isLoading: false
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Context provider component to encapsulate state logic and provide context
export const UserProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userProfileReducer, initialState);

    // Async action creators
    const fetchUserProfile = useCallback(async (userId) => {
        dispatch({ type: actionTypes.FETCH_START });
        try {
            // Simulate fetching user profile data from an API
            const response = await fetch(`/api/users/${userId}`);
            const userData = await response.json();
            dispatch({ type: actionTypes.FETCH_SUCCESS, payload: userData });
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_ERROR, payload: error.message });
        }
    }, []);

    const updateUserProfile = useCallback(async (userData) => {
        dispatch({ type: actionTypes.FETCH_START });
        try{
            // Simulate updating user profile data via an API
            const response = await fetch(`/api/users/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
                if (!response.ok) {
                    throw new Error('Failed to update user profile');
                }
                const updatedUserData = await response.json();
                dispatch({ type: actionTypes.UPDATE_USER_PROFILE, payload: updatedUserData });
            } catch (error) {
                dispatch({ type: actionTypes.FETCH_ERROR, payload: error.message });
              }
        }, []);

    // Clear error message
    const clearError = () => {
        dispatch({ type: actionTypes.CLEAR_ERROR });
    };


    return (
        <UserProfileContext.Provider value={{ ...state, fetchUserProfile, updateUserProfile, clearError }}>
            {children}
        </UserProfileContext.Provider>
    );
};

// Custom hook to consume the user profile context
export const useUserProfile = () => useContext(UserProfileContext);

// Helper functions for API calls
async function fetchUserProfile(userId) {
    // Simulate fetching user profile data from an API
}

async function updateUserProfile(userId, updatedUserData) {
    // Simulate updating user profile data via an API
}

