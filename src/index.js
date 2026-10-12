const FreelyEmailClient = require('./core/client');
const { FreelyEmailAPIError, FreelyEmailValidationError } = require('./utils/errors');
const { ECOSYSTEM_URLS, DEFAULT_BASE_URL, API_ENDPOINTS, SUCCESS_MESSAGES, ERROR_CODES, ERROR_MESSAGES } = require('./constants');

module.exports = {
  FreelyEmailClient,
  FreelyEmailAPIError,
  FreelyEmailValidationError,
  ECOSYSTEM_URLS,
  DEFAULT_BASE_URL,
  API_ENDPOINTS,
  SUCCESS_MESSAGES,
  ERROR_CODES,
  ERROR_MESSAGES,
};
