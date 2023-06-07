// const publicEmailSender = require('./src/mailer.js')
const fetch = require('node-fetch');
const testDomain = "http://localhost:3000/public/email/notification";
const domain = "https://send.donot-reply.online/"; // changed
let OTP = domain + "public/email/otpverification";
const NORMAL_EMAIL = domain +"public/email/notification";

const sendNormalEmail =  async function (appName,subject,recipientsEmail,senderEmail, message, HTMLfile) {

    const msgBody = {
        "appName" : appName,
        "subject" : subject,
        "recipientsEmail" : recipientsEmail,
        "senderEmail" : senderEmail,
        "emailContent" : message,
        "HTMLfile" : HTMLfile
    }

    const res = await fetch(NORMAL_EMAIL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msgBody)
    });

    const fRes = await res.json();
    return fRes;
    
}

const sendOTP =  async function (appName,subject,recipientsEmail,senderEmail, otp, withValidTime) {

    const msgBody = {
        "appName" : appName,
        "subject" : subject,
        "recipientsEmail" : recipientsEmail,
        "senderEmail" : senderEmail,
        "otp" : otp,
        "withValidTime" : withValidTime
    }

    const res = await fetch(OTP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msgBody)
    });

    const fRes = await res.json();
    console.log(fRes);
    return fRes;
    
}

const EmailSender = {
    sendNormalEmail,
    sendOTP
}


// sendOTP("mmt", "This is just a testing email", "harshituem@gmail.com","deadline","12345","5");

module.exports = EmailSender

