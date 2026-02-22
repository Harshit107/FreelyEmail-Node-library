export class FreelyEmailAPIError extends Error {
  status: number;
  details: any;
}

export class FreelyEmailValidationError extends Error {}

export interface SDKConfig {
  /** Override the default API base URL */
  baseURL?: string;
}

export interface BaseEmailPayload {
  /** Identifying name or email prefix of the sender */
  sender: string;
  /** The recipient's email address */
  recipient: string;
  /** The reply-to email address */
  replyTo?: string;
  /** Name of the application sending the email */
  app: string;
  /** Subject line of the email */
  subject: string;
}

export interface NotificationPayload extends BaseEmailPayload {
  /** Plain text message body */
  message?: string;
  /** Custom HTML string to be rendered */
  HTMLfile?: string;
}

export interface OTPPayload extends BaseEmailPayload {
  /** Custom OTP string to send to the user */
  otp: string;
  /** Validity time presented to the user (e.g., 10 for 10 minutes) */
  withValidTime?: number;
  /** Optional custom HTML override */
  HTMLfile?: string;
}

export interface RequestOTPPayload extends BaseEmailPayload {
  /** Validity time presented to the user (e.g., 10 for 10 minutes) */
  withValidTime?: number;
}

export interface LinkVerificationPayload extends BaseEmailPayload {
  /** The callback URL/link sent to the user to click */
  link: string;
  /** Validity time presented to the user */
  withValidTime?: number;
  /** Optional custom HTML override */
  HTMLfile?: string;
}

export interface APIResponse {
  success: boolean;
  data: any;
  error: string | null;
}

export class FreelyEmailClient {
  constructor(config?: SDKConfig);
  checkHealth(): Promise<APIResponse>;
  sendEmail(payload: NotificationPayload): Promise<APIResponse>;
  sendOTP(payload: OTPPayload): Promise<APIResponse>;
  requestOTP(payload: RequestOTPPayload): Promise<APIResponse>;
  sendLink(payload: LinkVerificationPayload): Promise<APIResponse>;
}
