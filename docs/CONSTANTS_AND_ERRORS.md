# SDK Centralized Constants & Unified Error Handling Guide

## 1. 📖 Human-Readable Overview

When working with APIs in client applications, hardcoding URLs or checking raw HTTP status codes (like `status === 400`) makes client code fragile. You often don't know *why* a 400 happened—was it a missing email? An invalid OTP? Or an invalid payload?

The `freely-email` SDK solves this by providing:
1. **Centralized Endpoints & URLs**: All API routes and default public URLs are declared in a centralized constant module.
2. **Unified Error Objects**: All errors (client-side validation, network failures, or API responses) follow an identical structure:
   ```json
   {
     "errorCode": "ERROR_CODE",
     "message": "Human readable explanation",
     "details": null
   }
   ```
3. **Structured Error Classes**: Enables developers to inspect `err.errorCode` programmatically with full auto-completion.

---

## 2. ⚙️ Technical Specifications

### Exported Constants

Importable directly from the package:
```javascript
const {
  DEFAULT_BASE_URL,
  API_ENDPOINTS,
  SUCCESS_MESSAGES,
  ERROR_CODES,
  ERROR_MESSAGES,
} = require("freely-email");
```

#### `DEFAULT_BASE_URL`
```javascript
"https://email.api.harshit107.in/api/v1/emails/"
```
*Note*: The client also checks `process.env.FREELY_EMAIL_BASE_URL` if set in the environment.

#### `API_ENDPOINTS`
```javascript
{
  HEALTH: "../health",
  SEND: "send",
  SEND_EMAIL: "send",
  OTP_SEND: "otp/send",
  OTP_REQUEST: "otp/request",
  LINK_VERIFICATION: "verification/link",
  SEND_LINK: "verification/link"
}
```

#### `SUCCESS_MESSAGES`
```javascript
{
  HEALTH: "Server is working perfectly fine.",
  EMAIL_SENT: "Email dispatched successfully",
  OTP_SENT: "OTP email dispatched successfully",
  OTP_REQUESTED: "OTP generated and dispatched successfully",
  LINK_SENT: "Verification link email dispatched successfully"
}
```

---

## 3. ✨ Standardized Success Envelope (`APIResponse`)

All successful methods resolve an `APIResponse` object with an identical contract:

```typescript
export interface APIResponse<T = any> {
  success: boolean;   // Always true on resolved promises
  data: T;            // Returned payload
  message?: string;   // Human-readable success message
  error: null;        // Always null on success
}
```

### Example Return:
```json
{
  "success": true,
  "data": {
    "messageId": "msg_01HXYZ987654"
  },
  "message": "Email dispatched successfully",
  "error": null
}
```

---

## 4. 🛡️ Error Classes & TypeScript Contracts


### `FreelyEmailAPIError`
Thrown when the API returns an error response (`status >= 400`) or during network failures.

| Property | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Always `"FreelyEmailAPIError"` |
| `status` | `number` | HTTP status code (e.g. `400`, `404`, `429`, `500`) |
| `errorCode` | `string` | Machine-readable error code (from `ERROR_CODES`) |
| `message` | `string` | Error description |
| `error` | `APIErrorPayload` | Standardized `{ errorCode, message, details? }` |
| `details` | `any` | Contextual payload (e.g. validation issue list) |

### `FreelyEmailValidationError`
Thrown synchronously by the SDK before any HTTP request if arguments are invalid.

| Property | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Always `"FreelyEmailValidationError"` |
| `errorCode` | `string` | `VALIDATION_ERROR`, `INVALID_BASE_URL`, or `INVALID_PAYLOAD` |
| `message` | `string` | Detailed message of invalid parameter |
| `error` | `APIErrorPayload` | Standardized `{ errorCode, message }` |

---

## 4. 📋 Error Codes Reference

| Error Code | Origin | Description |
| :--- | :---: | :--- |
| `VALIDATION_ERROR` | Client / API | Client input or schema validation failed |
| `INVALID_BASE_URL` | Client SDK | Non-string or empty `baseURL` passed to constructor |
| `INVALID_PAYLOAD` | Client SDK | Non-object passed to an SDK sending method |
| `NETWORK_ERROR` | Client SDK | Native fetch could not connect or lost connection |
| `INVALID_JSON` | API | Malformed JSON sent in payload |
| `MISSING_REQUIRED_FIELDS` | API | One or more mandatory fields are missing |
| `INVALID_RECIPIENT` | API | Recipient email is syntactically invalid |
| `MISSING_EMAIL_CONTENT` | API | Neither `message` nor `HTMLfile` was specified |
| `INVALID_OTP` | API | Empty or invalid OTP string |
| `INVALID_LINK` | API | Empty or invalid verification URL |
| `ROUTE_NOT_FOUND` | API | Endpoint requested does not exist |
| `RATE_LIMIT_EXCEEDED` | API | Exceeded 100 requests in a 15-minute window |
| `SMTP_NOT_CONFIGURED` | API | Remote API lacks SMTP credentials |
| `EMAIL_SEND_FAILED` | API | Remote SMTP provider failed to deliver |
| `INTERNAL_SERVER_ERROR` | API | Generic internal server error |
| `API_ERROR` | API | Fallback error code for unexpected errors |

---

## 5. 💡 Production Usage Examples

### Pattern 1: Differentiating Client vs Server Errors

```javascript
const {
  FreelyEmailClient,
  FreelyEmailAPIError,
  FreelyEmailValidationError,
  ERROR_CODES,
} = require("freely-email");

const client = new FreelyEmailClient();

async function sendOtpSafe(email, otp) {
  try {
    const res = await client.sendOTP({
      sender: "auth",
      recipient: email,
      app: "My App",
      subject: "Your OTP",
      otp: otp,
    });
    return { success: true, messageId: res.data.messageId };
  } catch (err) {
    if (err instanceof FreelyEmailValidationError) {
      // Local SDK validation issue
      return { success: false, reason: "CLIENT_ERROR", details: err.message };
    }

    if (err instanceof FreelyEmailAPIError) {
      if (err.errorCode === ERROR_CODES.RATE_LIMIT_EXCEEDED) {
        return { success: false, reason: "RATE_LIMITED", message: "Try again later." };
      }
      return { success: false, reason: err.errorCode, message: err.message };
    }

    throw err;
  }
}
```

### Pattern 2: TypeScript Type Support

```typescript
import {
  FreelyEmailClient,
  FreelyEmailAPIError,
  APIResponse,
  ERROR_CODES,
} from "freely-email";

const client = new FreelyEmailClient();

async function run(): Promise<void> {
  try {
    const res: APIResponse = await client.sendEmail({
      sender: "support",
      recipient: "customer@domain.com",
      app: "My SaaS",
      subject: "Welcome",
      message: "Hello!"
    });
    console.log("Delivered message ID:", res.data.messageId);
  } catch (error) {
    if (error instanceof FreelyEmailAPIError) {
      console.error(error.errorCode, error.status, error.message);
    }
  }
}
```
