"use strict";
const nodemailer = require("nodemailer");

async function sendWelcomeEmail(email, name) {
  let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'sbhikadiya892@rku.ac.in',
        pass: 'Sm7648it70967'
    }
  });
  let mailOptions = {
    from: 'sbhikadiya892@rku.ac.in',
    to: email,
    subject: 'Welocme, '+name,
    text: "Your account is created Successfully!!!"
  }

  transporter.verify(function(err, success){
    console.log(err, success);
  });

  transporter.sendMail(mailOptions, function(err, info){
    console.log(err, info);
  });

}

module.exports = { sendWelcomeEmail };
