import React, { createContext, useContext, useReducer} from 'react';

export const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

// AuthProvider component to wrap the app with
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume the auth context
export const useAuth = () => useContext(AuthContext);