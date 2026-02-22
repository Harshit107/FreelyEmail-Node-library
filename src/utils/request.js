const { FreelyEmailAPIError, FreelyEmailValidationError } = require('./errors');

class RequestManager {
  constructor(baseURL) {
    if (!baseURL || typeof baseURL !== 'string') {
      throw new FreelyEmailValidationError('A valid strictly string baseURL is required');
    }
    // ensure trailing slash
    this.baseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
  }

  async post(endpoint, data) {
    if (!data || typeof data !== 'object') {
      throw new FreelyEmailValidationError('Data payload must be a pure object.');
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
          responseData.error || 'The API returned an error',
          response.status,
          responseData
        );
      }

      return responseData;
    } catch (error) {
      if (error instanceof FreelyEmailAPIError || error instanceof FreelyEmailValidationError) {
        throw error;
      }
      throw new FreelyEmailAPIError(`Network Request failed: ${error.message}`, 500);
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
          responseData.error || 'The API returned an error',
          response.status,
          responseData
        );
      }
      return responseData;
    } catch (error) {
      if (error instanceof FreelyEmailAPIError) {
        throw error;
      }
      throw new FreelyEmailAPIError(`Network Request failed: ${error.message}`, 500);
    }
  }
}

module.exports = RequestManager;
