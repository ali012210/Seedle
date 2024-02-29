// Function to decode JWT token and obtain its expiry time

export const getTokenExpiry = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.exp;
};

// Function to check if token is expired

export const isTokenExpired = (token) => {
    const currentTime = Date.now() / 1000; // Current time in seconds
    const expiryTime = getTokenExpiry(token);
    return currentTime > expiryTime;
};