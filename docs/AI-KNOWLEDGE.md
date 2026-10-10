# AI Knowledge Base - SDK

## Quick Reference

### Key Methods

| Method | Purpose |
|--------|---------|
| `checkHealth()` | Ping API health endpoint |
| `sendEmail(payload)` | Send notification email |
| `sendOTP(payload)` | Send email with custom OTP |
| `requestOTP(payload)` | Request auto-generated OTP |
| `sendLink(payload)` | Send verification link email |

### Important Paths

| File | Purpose |
|------|---------|
| `src/core/client.js` | Main client class implementation |
| `src/utils/request.js` | HTTP request manager using fetch |
| `src/utils/errors.js` | Error classes |
| `src/index.js` | Module exports |
| `index.d.ts` | TypeScript definitions |
| `src/types/index.ts` | TypeScript type definitions |

### API Endpoints Used

| SDK Method | API Endpoint |
|------------|--------------|
| `checkHealth()` | `GET /api/v1/health` |
| `sendEmail()` | `POST /api/v1/emails/send` |
| `sendOTP()` | `POST /api/v1/emails/otp/send` |
| `requestOTP()` | `POST /api/v1/emails/otp/request` |
| `sendLink()` | `POST /api/v1/emails/verification/link` |

### Common Tasks

**Change API Base URL**:
```javascript
new FreelyEmailClient({ baseURL: "http://localhost:3000/api/v1/emails/" });
```

**Add new email type**:
1. Add new template in FreelyEmail-API `src/templates/`
2. Add controller in FreelyEmail-API
3. Add route in FreelyEmail-API
4. Add SDK method in `src/core/client.js`
5. Add type definition in `index.d.ts`

**Debug request failure**:
1. Check API server is running
2. Verify baseURL matches API address
3. Check network connectivity
4. Verify response format

### Error Classes

| Class | Purpose |
|-------|---------|
| `FreelyEmailAPIError` | HTTP errors from API |
| `FreelyEmailValidationError` | SDK-side validation errors |

### Data Flow

1. Client calls SDK method
2. SDK creates HTTP POST request
3. RequestManager.post() sends fetch request
4. API processes request
5. Response returned to SDK
6. SDK returns Promise resolution

### Type Definitions

**Base Email Payload**:
```typescript
{
  sender: string;
  recipient: string;
  replyTo?: string;
  app: string;
  subject: string;
}
```

**OTP Payload**:
```typescript
{
  otp: string;
  withValidTime?: number;
}
```

**Link Payload**:
```typescript
{
  link: string;
  withValidTime?: number;
}
```