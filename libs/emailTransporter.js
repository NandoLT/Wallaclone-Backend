'use strict'

require('dotenv').config({
  path: __dirname + '/../.env'
});

const nodemailer = require('nodemailer');

console.log('PROCES', process.env.EMAIL_HOST);

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS, 
    },
  });

  transporter.verify().then(() => {
    console.log('Ready for send emails');
});

module.exports = transporter;