const RequestManager = require('../utils/request');
const { DEFAULT_BASE_URL, API_ENDPOINTS } = require('../constants');

class FreelyEmailClient {
  /**
   * Initialize the FreelyEmail SDK
   * @param {Object} [config] 
   * @param {string} [config.baseURL="https://email.api.harshit107.in/api/v1/emails/"] - The custom API URL if proxying or testing locally
   */
  constructor(config = {}) {
    const defaultURL = (typeof process !== 'undefined' && process.env?.FREELY_EMAIL_BASE_URL) || DEFAULT_BASE_URL;
    this.request = new RequestManager(config.baseURL || defaultURL);
  }

  /**
   * Health Check: Verifies if the backend email service is online
   * @returns {Promise<Object>} API Health response
   */
  async checkHealth() {
    return await this.request.get(API_ENDPOINTS.HEALTH);
  }

  /**
   * Send a standard notification email
   * @param {Object} payload 
   * @returns {Promise<Object>} API response including messageId
   */
  async sendEmail(payload) {
    return await this.request.post(API_ENDPOINTS.SEND, payload);
  }

  /**
   * Send an OTP Email using a custom OTP provided in the payload
   * @param {Object} payload 
   * @returns {Promise<Object>} API response including messageId
   */
  async sendOTP(payload) {
    return await this.request.post(API_ENDPOINTS.OTP_SEND, payload);
  }

  /**
   * Request the API to auto-generate and send an OTP
   * @param {Object} payload 
   * @returns {Promise<Object>} API response including messageId AND the generated OTP
   */
  async requestOTP(payload) {
    return await this.request.post(API_ENDPOINTS.OTP_REQUEST, payload);
  }

  /**
   * Send a Link Verification Email
   * @param {Object} payload 
   * @returns {Promise<Object>} API response including messageId
   */
  async sendLink(payload) {
    return await this.request.post(API_ENDPOINTS.LINK_VERIFICATION, payload);
  }
}

module.exports = FreelyEmailClient;

