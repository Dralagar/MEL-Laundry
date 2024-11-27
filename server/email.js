const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your email password
    },
  });

  let info = await transporter.sendMail({
    from: '"Your Name" <your-email@example.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;
