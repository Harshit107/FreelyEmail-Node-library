const FreelyEmailClient = require('./core/client');
const { FreelyEmailAPIError, FreelyEmailValidationError } = require('./utils/errors');

module.exports = {
  FreelyEmailClient,
  FreelyEmailAPIError,
  FreelyEmailValidationError
};
