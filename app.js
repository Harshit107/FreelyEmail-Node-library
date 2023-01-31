// const publicEmailSender = require('./src/mailer.js')
const fetch = require('node-fetch');


const sendEmail =  async function (appName,subject,recipientsEmail,senderEmail, message, HTMLfile) {

    const msgBody = {
        "appName" : appName,
        "subject" : subject,
        "recipientsEmail" : recipientsEmail,
        "senderEmail" : senderEmail,
        "emailContent" : message,
        "HTMLfile" : HTMLfile
    }

    const res = await fetch('http://localhost:3000/public/email/notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msgBody)
    });
    const fRes = await res.json();
    console.log(fRes);
    
}

module.exports = {sendEmail}

