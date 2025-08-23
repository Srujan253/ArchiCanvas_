// File: backend/utils/errorHandler.js
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Maintain proper stack trace (only in V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ErrorHandler;
