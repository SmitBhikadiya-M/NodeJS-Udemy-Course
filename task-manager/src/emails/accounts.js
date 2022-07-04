const sendEmail = (reciepent, subject='', body='') => {
  var api_key = process.env.MAILGUN_SECRET_KEY;
  var domain = process.env.MAILGUN_DOMAIN;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'sdbhikadiya7648@gmail.com',
    to: reciepent,
    subject: subject,
    html: body
  }; 
  return mailgun.messages().send(data);
}

module.exports = { sendEmail };
