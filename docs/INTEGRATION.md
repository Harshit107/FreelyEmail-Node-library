# Integration: SDK → API

## Communication Flow

```
Client Application
    ↓
FreelyEmailClient.requestOTP({...})
    ↓
RequestManager.post('otp/request', payload)
    ↓
HTTP POST https://email.api.harshit107.in/api/v1/emails/otp/request
    ↓
FreelyEmail-API Backend
    ↓
Returns: { success: true, data: { messageId, otp } }
```

## Request Format

### SDK → API Request

```javascript
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify(payload)
}
```

### Request URL Construction

```javascript
// baseURL from constructor
const baseURL = "https://email.api.harshit107.in/api/v1/emails/";

// Endpoint appended to baseURL
const url = `${baseURL}${endpoint}`;  // e.g., "https://.../otp/request"
```

### Health Check URL

```javascript
// Special case: go up one level from emails/
const healthURL = `${baseURL}../health`;
// Resolves to: "https://email.api.harshit107.in/api/v1/health"
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "messageId": "abc123",
    "otp": "123456"
  },
  "error": null
}
```

### Error Response

```json
{
  "success": false,
  "error": "Enter Valid Recipient Email Address"
}
```

## Error Handling

### SDK Error Classes

```javascript
class FreelyEmailAPIError extends Error {
  status: number;      // HTTP status code
  details: object;     // Response data
}

class FreelyEmailValidationError extends Error {
  // Thrown for SDK-side validation errors
}
```

### RequestManager Error Flow

1. API returns error response
2. RequestManager checks `response.ok`
3. Throws `FreelyEmailAPIError` with status and details
4. SDK method throws to caller

## Shared Data Structures

### Request Payloads

| Endpoint | Required Fields |
|----------|-----------------|
| `/send` | `sender`, `recipient`, `app`, `subject`, one of `message` or `HTMLfile` |
| `/otp/send` | `sender`, `recipient`, `app`, `subject`, `otp` |
| `/otp/request` | `sender`, `recipient`, `app`, `subject` |
| `/verification/link` | `sender`, `recipient`, `app`, `subject`, `link` |

### Response Structure

```typescript
interface APIResponse {
  success: boolean;
  data: any;
  error: string | null;
}
```

## Network Layer

- Uses native Node.js `fetch` API
- No external HTTP client dependencies
- Requires Node.js >= 18.0.0

## Connection Details

### Default API URL

```javascript
const defaultURL = "https://email.api.harshit107.in/api/v1/emails/";
```

### Custom API URL

```javascript
new FreelyEmailClient({ baseURL: "http://localhost:3000/api/v1/emails/" });
```

### Required Headers

```javascript
{
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```