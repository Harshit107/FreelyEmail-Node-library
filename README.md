# freelyEmail 🤖 ✉️

Welcome to **freelyEmail** – a simple and straightforward library for sending automated emails natively in Node.js (via the [FreelyEmail-API](https://github.com/Harshit107/FreelyEmail-API)).

**Version Requirement**: Node.js >= 18.0.0 (Uses native fetch).

## 📥 Installation
```bash
npm install freely-email
```

## 🛠 Usage
Import the library into your project:

```javascript
const freelyEmail = require("freely-email");
```

### 1. Send Normal Email 📝
Send a customized email with optional HTML attachments.
```javascript
freelyEmail.sendEmail({
  "sender": "example-bot",
  "recipient": "user@example.com",
  "replyTo": "support@example.com",
  "app": "My Demo App",
  "subject": "Hello World!",
  "message": "This is a plain text message.",
  "HTMLfile": "<html><body><h1>Optional HTML Override</h1></body></html>"
}).then(console.log).catch(console.error);
```

### 2. Request OTP (Auto-Generated) 🔐
Generate a secure random OTP automatically and send it to your user using prebuilt beautiful HTML templates.

```javascript
freelyEmail.requestOTP({
  "sender": "Example Auth",
  "recipient": "user@example.com",
  "app": "Demo App",
  "subject": "Your Verification Code",
  "withValidTime": 10 // Validity time displayed in minutes 
}).then(console.log).catch(console.error);
```

### 3. Send OTP (Custom) 🔐
Send to a user an OTP code that you generated on your own backend.
```javascript
freelyEmail.sendOTP({
  "sender": "Example Auth",
  "recipient": "user@example.com",
  "app": "Demo App",
  "subject": "Your Custom Verification Code",
  "otp": "987654",
  "withValidTime": 15
}).then(console.log).catch(console.error);
```

### 4. Send Verification Link 🔑
Send a verification link using a beautiful HTML template.

```javascript
freelyEmail.sendLink({
  "sender": "Example Link Service",
  "recipient": "user@example.com",
  "replyTo": "support@example.com",
  "app": "Demo App",
  "subject": "Verify Your Email Address",
  "link": "https://example.com/verify?token=12345",
  "withValidTime": 30
}).then(console.log).catch(console.error);
```
