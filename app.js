// const publicEmailSender = require('./src/mailer.js')
const fetch = require("node-fetch");

const testDomain = "http://localhost:3000/";
const domain = "https://email.api.harshit107.tech/"; // changed

let OTP = domain + "public/email/verification/otp";
let OTPRequest = domain + "public/email/verification/otp/request";
const NORMAL_EMAIL = domain + "public/email/notification";
let LINK = domain + "public/email/verification/link";


const sendEmail = async function (data) {
  if(!data)
    throw new Error("Enter valid email body");

  const res = await fetch(NORMAL_EMAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const fRes = await res.json();
  return fRes;
};

const sendOTP = async function (data) {

  if (!data) throw new Error("Enter valid email body");

  const res = await fetch(OTP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const fRes = await res.json();
  return fRes;
};

// ---------------- Request OTP````````````````

const sendOTPRequest = async function (data) {

  if (!data) throw new Error("Enter valid email body");

  const res = await fetch(OTPRequest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const fRes = await res.json();
  return fRes;
};


const sendLink = async function (data) {

  if (!data) throw new Error("Enter valid email body");
  
  const res = await fetch(LINK, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  const fRes = await res.json();
  return fRes;
};

const EmailSender = {
  sendEmail,
  sendOTP,
  sendOTPRequest,
  sendLink
};

module.exports = EmailSender;
