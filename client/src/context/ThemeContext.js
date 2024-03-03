import React, { createContext, useReducer, useContext} from 'react';

// Define the context
export const ThemeContext = createContext();

// Initial state with light theme as default
const initialState = {
    theme: 'light',
};

// Reducer function to toggle theme (light/dark)
const themeReducer = (state, action) => {
    switch(action.type) {
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            };
        default:
            return state;
    }
};

// Context Provider component
export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    // Action creators
    const toggleTheme = () => {
        dispatch({ type: 'TOGGLE_THEME' });
    };

    // The value passed to the provider includes the current theme, and the toggleTheme function
    const themeContextValue = {
        theme: state.theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to consume the theme context
export const useTheme = () => useContext(ThemeContext);