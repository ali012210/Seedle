class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); //Adds a message property to the error object
    this.statusCode = statusCode; //Adds a statusCode property to the error object
  }
}

module.exports = CustomError;