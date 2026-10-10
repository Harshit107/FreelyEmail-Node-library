const FreelyEmailClient = require('./core/client');
const { FreelyEmailAPIError, FreelyEmailValidationError } = require('./utils/errors');
const { DEFAULT_BASE_URL, API_ENDPOINTS, SUCCESS_MESSAGES, ERROR_CODES, ERROR_MESSAGES } = require('./constants');

module.exports = {
  FreelyEmailClient,
  FreelyEmailAPIError,
  FreelyEmailValidationError,
  DEFAULT_BASE_URL,
  API_ENDPOINTS,
  SUCCESS_MESSAGES,
  ERROR_CODES,
  ERROR_MESSAGES,
};
