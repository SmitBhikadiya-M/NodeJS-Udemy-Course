var mg = require('mailgun-js');

const sendEmail = (reciepent, subject='', body='') => {
  
  const mailConfig = {
    apiKey: process.env.MAILGUN_SECRET_KEY, 
    domain: process.env.MAILGUN_DOMAIN
  }

  var mailgun = mg(mailConfig);
  var data = {
    from: 'sdbhikadiya7648@gmail.com',
    to: reciepent,
    subject: subject,
    html: body
  }; 
  return mailgun.messages().send(data);
}

module.exports = { sendEmail };
