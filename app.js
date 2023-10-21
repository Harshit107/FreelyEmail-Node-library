// const publicEmailSender = require('./src/mailer.js')
const fetch = require("node-fetch");

const domain = "https://email.api.harshit107.in/"; // changed

let OTP = domain + "public/email/verification/otp";
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

  return await res.json();

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

  return await res.json();
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
  return await res.json();
};

const EmailSender = {
  sendEmail,
  sendOTP,
  sendOTPRequest,
  sendLink
};

module.exports = EmailSender;
