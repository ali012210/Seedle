import React, { createContext, useContext, useReducer } from 'react';

// Define the context
export const UserOverviewContext = createContext();

// Initial state for the user overview page
const initialState = {
    userProfile: {
        avatar: '',
        bio: '',
        plantsOwned: [],
        seedCount: 0,
    },
    posts: [],
    comments: [],
    isLoading: false,
    error: null,
};

// Reducer function to handle state updates
const userOverviewReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true};
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                userProfile: action.payload.userProfile,
                posts: action.payload.posts,
                comments: action.payload.comments,
            };
        case 'FETCH_FAILURE':
            return { ...state, isLoading: false, error: action.payload.error};
            default:
                return state;
        }
    };

// Provider Component
export const UserOverviewProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userOverviewReducer, initialState);

    // Function to fetch the public user profile data
    const fetchUserOverview = async (userId) => {
      dispatch({ type: 'FETCH_START'});
      try {
        // Simulated fetch from API
        const userData = await getUserOverviewData(userId); // Implementation based on my backend
        dispatch({ type: 'FETCH_SUCCESS', payload: userData});
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.toString() });
     }
   };

   // Value provided to the context consumers
    const contextValue = {
        ...state,
        fetchUserOverview,
    };

    return (
        <UserOverviewContext.Provider value={contextValue}>
            {children}
        </UserOverviewContext.Provider>
    );
};

// Custom hook to consume the context
export const useUserOverview = () => useContext(UserOverviewContext);

// Simulated fetch from API
async function getUserOverviewData(userId) {
    // Simulated fetch from API
    const userProfile = await fetch(`/api/user/${userId}/profile`);
    const posts = await fetch(`/api/user/${userId}/posts`);
    const comments = await fetch(`/api/user/${userId}/comments`);
    return {
        userProfile: await userProfile.json(),
        posts: await posts.json(),
        comments: await comments.json(),
    };
}
