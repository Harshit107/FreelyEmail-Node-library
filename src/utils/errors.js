class FreelyEmailAPIError extends Error {
  constructor(message, status, details = {}) {
    super(message);
    this.name = 'FreelyEmailAPIError';
    this.status = status;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

class FreelyEmailValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FreelyEmailValidationError';
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  FreelyEmailAPIError,
  FreelyEmailValidationError
};
