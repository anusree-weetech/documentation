const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: 'SENDGRID_API_KEY'
    }
  })
);

const mailOptions = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Test email from Nodemailer',
  text: 'This is a test email sent using SendGrid with Nodemailer.',
  html: '<p>This is a <strong>test</strong> email.</p>',
};

transporter.sendMail(mailOptions)
  .then(() => console.log('Email sent'))
  .catch(error => console.error(error));
