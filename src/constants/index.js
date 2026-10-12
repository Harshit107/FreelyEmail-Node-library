/**
 * Centralized constants, API endpoints, error definitions, and success messages for FreelyEmail SDK
 */

const ECOSYSTEM_URLS = Object.freeze({
  LOGGER_API: "https://logger-api.harshit107.online",
  LOGGER_UI: "https://logger.harshit107.online",
  MAIL_API: "https://freelyemail-api.harshit107.online",
  SHOWCASE_UI: "https://freelyemail.harshit107.online",
});

const DEFAULT_BASE_URL = `${ECOSYSTEM_URLS.MAIL_API}/api/v1/emails/`;

const API_ENDPOINTS = Object.freeze({
  HEALTH: "../health",
  SEND: "send",
  SEND_EMAIL: "send",
  OTP_SEND: "otp/send",
  OTP_REQUEST: "otp/request",
  LINK_VERIFICATION: "verification/link",
  SEND_LINK: "verification/link",
});

const SUCCESS_MESSAGES = Object.freeze({
  HEALTH: "Server is working perfectly fine.",
  EMAIL_SENT: "Email dispatched successfully",
  OTP_SENT: "OTP email dispatched successfully",
  OTP_REQUESTED: "OTP generated and dispatched successfully",
  LINK_SENT: "Verification link email dispatched successfully",
});

const ERROR_CODES = Object.freeze({
  // Client-side Validation & Network Errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_BASE_URL: "INVALID_BASE_URL",
  INVALID_PAYLOAD: "INVALID_PAYLOAD",
  NETWORK_ERROR: "NETWORK_ERROR",

  // API Error Codes
  INVALID_JSON: "INVALID_JSON",
  MISSING_REQUIRED_FIELDS: "MISSING_REQUIRED_FIELDS",
  INVALID_RECIPIENT: "INVALID_RECIPIENT",
  MISSING_EMAIL_CONTENT: "MISSING_EMAIL_CONTENT",
  INVALID_OTP: "INVALID_OTP",
  INVALID_LINK: "INVALID_LINK",
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  SMTP_NOT_CONFIGURED: "SMTP_NOT_CONFIGURED",
  EMAIL_SEND_FAILED: "EMAIL_SEND_FAILED",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  API_ERROR: "API_ERROR",
});

const ERROR_MESSAGES = Object.freeze({
  [ERROR_CODES.VALIDATION_ERROR]: "Client validation error occurred",
  [ERROR_CODES.INVALID_BASE_URL]: "A valid strictly string baseURL is required",
  [ERROR_CODES.INVALID_PAYLOAD]: "Data payload must be a pure object.",
  [ERROR_CODES.NETWORK_ERROR]: "Network request failed",
  [ERROR_CODES.API_ERROR]: "The API returned an error",
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: "Internal Server Error",
});

module.exports = {
  ECOSYSTEM_URLS,
  DEFAULT_BASE_URL,
  API_ENDPOINTS,
  SUCCESS_MESSAGES,
  ERROR_CODES,
  ERROR_MESSAGES,
};
