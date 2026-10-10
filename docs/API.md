# API Documentation - SDK

The SDK calls these API endpoints:

---

## 1. Health Check

**Endpoint**: `GET /api/v1/health`  
**Purpose**: Check if API server is running

### Response
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 14.2,
    "timestamp": "2026-09-28T14:30:00.000Z"
  },
  "message": "Server is working perfectly fine.",
  "error": null
}
```

**SDK Method**: `FreelyEmailClient.checkHealth()`

---

## 2. Send Notification Email

**Endpoint**: `POST /api/v1/emails/send`  
**Purpose**: Send a plain text or custom HTML email

### Request Body
```json
{
  "sender": "string (required)",
  "recipient": "string (required)",
  "replyTo": "string (optional)",
  "app": "string (required)",
  "subject": "string (required)",
  "message": "string (optional)",
  "HTMLfile": "string (optional)"
}
```

**Note**: At least one of `message` or `HTMLfile` is required.

### Response (Success)
```json
{
  "success": true,
  "data": {
    "messageId": "abc123"
  },
  "message": "Email dispatched successfully",
  "error": null
}
```


**SDK Method**: `FreelyEmailClient.sendEmail(payload)`

---

## 3. Send OTP (Custom)

**Endpoint**: `POST /api/v1/emails/otp/send`  
**Purpose**: Send email with custom OTP code

### Request Body
```json
{
  "sender": "string (required)",
  "recipient": "string (required)",
  "replyTo": "string (optional)",
  "app": "string (required)",
  "subject": "string (required)",
  "otp": "string (required)",
  "withValidTime": "number (optional)",
  "HTMLfile": "string (optional)"
}
```

### Response (Success)
```json
{
  "success": true,
  "data": {
    "messageId": "abc123"
  },
  "message": "OTP email dispatched successfully",
  "error": null
}
```

**SDK Method**: `FreelyEmailClient.sendOTP(payload)`

---

## 4. Request Auto-Generated OTP

**Endpoint**: `POST /api/v1/emails/otp/request`  
**Purpose**: Let API generate and send a 6-digit OTP

### Request Body
```json
{
  "sender": "string (required)",
  "recipient": "string (required)",
  "replyTo": "string (optional)",
  "app": "string (required)",
  "subject": "string (required)",
  "withValidTime": "number (optional)"
}
```

### Response (Success)
```json
{
  "success": true,
  "data": {
    "messageId": "abc123",
    "otp": "123456"
  },
  "message": "OTP generated and dispatched successfully",
  "error": null
}
```

**SDK Method**: `FreelyEmailClient.requestOTP(payload)`

---

## 5. Send Verification Link

**Endpoint**: `POST /api/v1/emails/verification/link`  
**Purpose**: Send email with verification button/link

### Request Body
```json
{
  "sender": "string (required)",
  "recipient": "string (required)",
  "replyTo": "string (optional)",
  "app": "string (required)",
  "subject": "string (required)",
  "link": "string (required)",
  "withValidTime": "number (optional)",
  "HTMLfile": "string (optional)"
}
```

### Response (Success)
```json
{
  "success": true,
  "data": {
    "messageId": "abc123"
  },
  "message": "Verification link email dispatched successfully",
  "error": null
}
```

**SDK Method**: `FreelyEmailClient.sendLink(payload)`


---

## Base URL

Default production URL:
```
https://email.api.harshit107.in/api/v1/emails/
```

For local development:
```
http://localhost:3000/api/v1/emails/
```

Available via SDK constant `DEFAULT_BASE_URL`.

---

## Error Handling

All SDK method calls throw `FreelyEmailAPIError` or `FreelyEmailValidationError` with a structured `error` property:

```json
{
  "errorCode": "VALIDATION_ERROR",
  "message": "Sender is required, A valid recipient email address is required"
}
```

For the complete guide and code examples, see [CONSTANTS_AND_ERRORS.md](CONSTANTS_AND_ERRORS.md).