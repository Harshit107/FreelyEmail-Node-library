const { FreelyEmailAPIError, FreelyEmailValidationError } = require('./errors');
const { ERROR_CODES, ERROR_MESSAGES } = require('../constants');

class RequestManager {
  constructor(baseURL) {
    if (!baseURL || typeof baseURL !== 'string') {
      throw new FreelyEmailValidationError(
        ERROR_MESSAGES[ERROR_CODES.INVALID_BASE_URL],
        ERROR_CODES.INVALID_BASE_URL
      );
    }
    // ensure trailing slash
    this.baseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
  }

  async post(endpoint, data) {
    if (!data || typeof data !== 'object') {
      throw new FreelyEmailValidationError(
        ERROR_MESSAGES[ERROR_CODES.INVALID_PAYLOAD],
        ERROR_CODES.INVALID_PAYLOAD
      );
    }

    const url = new URL(endpoint, this.baseURL).toString();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new FreelyEmailAPIError(
          responseData.error,
          response.status,
          responseData.error?.details || responseData
        );
      }

      return responseData;
    } catch (error) {
      if (error instanceof FreelyEmailAPIError || error instanceof FreelyEmailValidationError) {
        throw error;
      }
      throw new FreelyEmailAPIError(
        {
          errorCode: ERROR_CODES.NETWORK_ERROR,
          message: `Network Request failed: ${error.message}`,
        },
        500
      );
    }
  }

  async get(endpoint) {
    const url = new URL(endpoint, this.baseURL).toString();

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const responseData = await response.json();

      if (!response.ok) {
        throw new FreelyEmailAPIError(
          responseData.error,
          response.status,
          responseData.error?.details || responseData
        );
      }
      return responseData;
    } catch (error) {
      if (error instanceof FreelyEmailAPIError || error instanceof FreelyEmailValidationError) {
        throw error;
      }
      throw new FreelyEmailAPIError(
        {
          errorCode: ERROR_CODES.NETWORK_ERROR,
          message: `Network Request failed: ${error.message}`,
        },
        500
      );
    }
  }
}

module.exports = RequestManager;
