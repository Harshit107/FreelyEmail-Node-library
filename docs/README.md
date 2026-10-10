# FreelyEmail-Node-library Documentation

## Overview

This folder contains documentation for the FreelyEmail-Node-library SDK.

## Documentation Structure

| File | Purpose |
|------|---------|
| [README.md](README.md) | This overview file |
| [INTEGRATION.md](INTEGRATION.md) | How SDK connects to the API |
| [API.md](API.md) | API endpoint documentation |
| [AI-KNOWLEDGE.md](AI-KNOWLEDGE.md) | Quick reference for AI agents |

## Quick Start

### Install the SDK

```bash
npm install freely-email
```

### Basic Usage

```javascript
const { FreelyEmailClient } = require("freely-email");

const emailClient = new FreelyEmailClient();

// Request auto-generated OTP
const result = await emailClient.requestOTP({
  sender: "auth",
  recipient: "user@example.com",
  app: "MyApp",
  subject: "Your OTP",
  withValidTime: 10
});

console.log("OTP:", result.data.otp);
```

## How It Works

The SDK communicates with the FreelyEmail-API backend:

```
Client Application
    ↓
FreelyEmailClient methods
    ↓
HTTP requests (fetch API)
    ↓
FreelyEmail-API (https://email.api.harshit107.in)
    ↓
Sendinblue SMTP
    ↓
MongoDB (logging)
```

## Important Files

| File | Purpose |
|------|---------|
| `src/core/client.js` | Main client class |
| `src/utils/request.js` | HTTP request handling |
| `src/utils/errors.js` | Error classes |
| `index.d.ts` | TypeScript definitions |

## API Base URL

- **Default**: `https://email.api.harshit107.in/api/v1/emails/`
- **Local**: `http://localhost:3000/api/v1/emails/`

## See Also

- [FreelyEmail-API Documentation](../FreelyEmail-API/docs/README.md) - Backend API documentation