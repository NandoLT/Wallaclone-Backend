'use strict'

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "akkerstudio@gmail.com",
      pass: "suksqelqmrpjgtbe", 
    },
  });

transporter.verify().then(() => {
    console.log('Ready for send emails');
});

module.exports = transporter;