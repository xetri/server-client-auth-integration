import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: '0.0.0.0',
  port: 1025,
  auth: {
      user: 'no-reply@sangeet.com',
      pass: 'password'
  }
});

const mailOptions = {
  from: 'no-reply@sangeet.com',
  to: 'xetri134@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email sent using Nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
