// const publicEmailSender = require('./src/mailer.js')
const fetch = require('node-fetch');

const testDomain = "http://localhost:3000/";
const domain = "https://email.api.harshit107.tech/"; // changed

let OTP = domain + "public/email/verification/otp";
let OTPRequest = domain + "public/email/verification/otp/request";
const NORMAL_EMAIL = domain +"public/email/notification";

const sendEmail = async function (  app,  subject,  recipient,  replyTo,  sender,  message,  HTMLfile) {
  const msgBody = {
    app,
    subject,
    recipient,
    replyTo,
    sender,
    message,
    HTMLfile,
  };

  const res = await fetch(NORMAL_EMAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msgBody),
  });

  const fRes = await res.json();
  return fRes;
};

const sendOTP = async function (  app,  subject,  recipient,  replyTo,  sender,  otp, withValidTime, HTMLfile ) {
  const msgBody = {
    app,
    subject,
    recipient,
    replyTo,
    sender,
    otp,
    withValidTime,
    HTMLfile,
  };

  const res = await fetch(OTP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msgBody),
  });

  const fRes = await res.json();
  console.log(fRes);
  return fRes;
};



// ---------------- Request OTP````````````````

const sendOTPRequest = async function (
  app,
  subject,
  recipient,
  replyTo,
  sender,
  withValidTime,
) {
  const msgBody = {
    app,
    subject,
    recipient,
    replyTo,
    sender,
    withValidTime,
  };

  const res = await fetch(OTPRequest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msgBody),
  });

  const fRes = await res.json();
  console.log(fRes);
  return fRes;
};


const EmailSender = {
  sendEmail,
  sendOTP,
  sendOTPRequest
};


//sendEmail("mmt", "This is just a testing email", "harshit107.in@gmail.com","harshit107.in.2022@gmail.com","deadline","12345");
// sendOTP("mmt", "This is just a testing email", "harshit107.in@gmail.com","harshit107.in.2022@gmail.com","verification","12345",10);
// sendOTPRequest("mmt", "This is just a testing email", "harshit107.in@gmail.com","harshit107.in.2022@gmail.com","OTPRequest",10);

module.exports = EmailSender

