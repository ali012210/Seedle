import React, { createContext, useContext, useReducer } from 'react';

// Define the UI context
export const UIContext = createContext();

// Initial UI state
const initialState = {
    isLoading: false,
    errorMessage: '',
    isModalOpen: false,
};

// UI reducer function
const UIReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: action.payload
            };
        case 'TOGGLE_MODAL':
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            };
        default:
            return state;
    }
};

// UI Provider component
export const UIProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UIReducer, initialState);

    // Action creators
    const setLoading = (isLoading) => {
        dispatch({ type: 'SET_LOADING', payload: isLoading });
    };

    const setErrorMessage = (message) => {
        dispatch({ type: 'SET_ERROR_MESSAGE', payload: message });
    };

    const toggleModal = () => {
        dispatch({ type: 'TOGGLE_MODAL' });
    };

    // The value passed to the provider includes the current UI state, and the action creators
    const uiContextValue = {
        ...state,
        setLoading,
        setErrorMessage,
        toggleModal,
    };

    return (
        <UIContext.Provider value={uiContextValue}>
            {children}
        </UIContext.Provider>
    );
};

// Custom hook to consume the UI context
export const useUI = () => useContext(UIContext);