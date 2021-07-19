'use strict'

const cote = require('cote');
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

const responder = new cote.Responder({
    name: 'Email Sender'
});

responder.on('Send Email', async (req, done) => {
    try {

        const {emailData} = req;

        let info = await transporter.sendMail(emailData);

        const result = 'Email has been send';
        await done(result);

    } catch (error) {
        console.log(error)
    }
    
});