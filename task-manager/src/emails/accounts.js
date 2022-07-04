"use strict";
const nodemailer = require("nodemailer");

async function sendWelcomeEmail(email, subject='', body='') {
  let transporter = nodemailer.createTransport({
    service:'Gmail',
    auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASSWORD
    }
  });
  let mailOptions = {
    from: process.env.EMAIL_ADMIN,
    to: email,
    subject: subject,
    html: body
  }

  transporter.sendMail(mailOptions, function(err, info){
    console.log(err, info);
  });
}

module.exports = { sendWelcomeEmail };
