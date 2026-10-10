const { ERROR_CODES, ERROR_MESSAGES } = require('../constants');

class FreelyEmailAPIError extends Error {
  /**
   * @param {string|Object} errorOrMessage - Error message or structured error object from API
   * @param {number} [status=500] - HTTP status code
   * @param {any} [details=null] - Additional details or raw response body
   */
  constructor(errorOrMessage, status = 500, details = null) {
    let message = ERROR_MESSAGES[ERROR_CODES.API_ERROR] || "The API returned an error";
    let errorCode = ERROR_CODES.API_ERROR;
    let errorDetails = details;

    if (typeof errorOrMessage === 'string') {
      message = errorOrMessage;
    } else if (errorOrMessage && typeof errorOrMessage === 'object') {
      message = errorOrMessage.message || errorOrMessage.Message || message;
      errorCode = errorOrMessage.errorCode || errorOrMessage.ErrorCode || errorCode;
      if (errorOrMessage.details !== undefined) {
        errorDetails = errorOrMessage.details;
      }
    }

    super(message);
    this.name = 'FreelyEmailAPIError';
    this.status = status;
    this.errorCode = errorCode;
    this.details = errorDetails;
    this.error = {
      errorCode: this.errorCode,
      message: this.message,
      ...(this.details !== null && this.details !== undefined ? { details: this.details } : {}),
    };

    Error.captureStackTrace(this, this.constructor);
  }
}

class FreelyEmailValidationError extends Error {
  /**
   * @param {string} message - Validation error message
   * @param {string} [errorCode=ERROR_CODES.VALIDATION_ERROR] - Machine readable error code
   * @param {any} [details=null] - Contextual details
   */
  constructor(message, errorCode = ERROR_CODES.VALIDATION_ERROR, details = null) {
    super(message);
    this.name = 'FreelyEmailValidationError';
    this.errorCode = errorCode;
    this.details = details;
    this.error = {
      errorCode: this.errorCode,
      message: this.message,
      ...(this.details !== null && this.details !== undefined ? { details: this.details } : {}),
    };

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  FreelyEmailAPIError,
  FreelyEmailValidationError,
};
