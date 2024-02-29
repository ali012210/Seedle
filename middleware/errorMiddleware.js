function errorHandlingMiddleware(err, req, res, next) {
    // Log the error for debugging purposes
  console.error(err.stack);
  

  // Set the response status code
  const statusCode = err.statusCode || 500; // Use the statusCode from the error, or default to 500

  // Send a formatted error message to the client
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || "An unexpected error occurred",
    });
}

