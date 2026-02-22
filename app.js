// Native fetch is available in Node > 18.0.0

const domain = "https://email.api.harshit107.in/api/v1/emails/"; 

const NORMAL_EMAIL = domain + "send";
const OTP_SEND = domain + "otp/send";
const OTP_REQUEST = domain + "otp/request";
const VERIFY_LINK = domain + "verification/link";

/**
 * Send a standard notification email
 */
const sendEmail = async function (data) {
  if (!data) throw new Error("Enter valid email body");

  const res = await fetch(NORMAL_EMAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

/**
 * Send an OTP Email using custom OTP provided in payload
 */
const sendOTP = async function (data) {
  if (!data) throw new Error("Enter valid email body");

  const res = await fetch(OTP_SEND, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

/**
 * Request an Auto-Generated OTP 
 */
const requestOTP = async function (data) {
  if (!data) throw new Error("Enter valid email body");

  const res = await fetch(OTP_REQUEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

/**
 * Send a Link Verification Email
 */
const sendLink = async function (data) {
  if (!data) throw new Error("Enter valid email body");
  
  const res = await fetch(VERIFY_LINK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });  

  return await res.json();
};

const EmailSender = {
  sendEmail,
  sendOTP,
  requestOTP,
  sendLink,
};

module.exports = EmailSender;
