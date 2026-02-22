const RequestManager = require('../utils/request');

class FreelyEmailClient {
  /**
   * Initialize the FreelyEmail SDK
   * @param {Object} [config] 
   * @param {string} [config.baseURL="https://email.api.harshit107.in/api/v1/emails/"] - The custom API URL if proxying or testing locally
   */
  constructor(config = {}) {
    const defaultURL = "https://email.api.harshit107.in/api/v1/emails/";
    this.request = new RequestManager(config.baseURL || defaultURL);
  }

  /**
   * Health Check: Verifies if the backend email service is online
   * @returns {Promise<Object>} API Health response
   */
  async checkHealth() {
    // Note: the health route in API might be `/api/v1/health` instead of under `/api/v1/emails/`
    // If baseURL is "https://email.api.harshit107.in/api/v1/emails/", going back one level is required:
    return await this.request.get('../health');
  }

  /**
   * Send a standard notification email
   * @param {Object} payload 
   * @returns {Promise<Object>} API response including messageId
   */
  async sendEmail(payload) {
    return await this.request.post('send', payload);
  }

  /**
   * Send an OTP Email using a custom OTP provided in the payload
   * @param {Object} payload 
   * @returns {Promise<Object>} API response including messageId
   */
  async sendOTP(payload) {
    return await this.request.post('otp/send', payload);
  }

  /**
   * Request the API to auto-generate and send an OTP
   * @param {Object} payload 
   * @returns {Promise<Object>} API response including messageId AND the generated OTP
   */
  async requestOTP(payload) {
    return await this.request.post('otp/request', payload);
  }

  /**
   * Send a Link Verification Email
   * @param {Object} payload 
   * @returns {Promise<Object>} API response including messageId
   */
  async sendLink(payload) {
    return await this.request.post('verification/link', payload);
  }
}

module.exports = FreelyEmailClient;
