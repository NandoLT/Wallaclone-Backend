'use strict'

const cote = require('cote');
const nodemailer = require('nodemailer');
const transporter = require('../../libs/emailTransporter.js');

const responder = new cote.Responder({
    name: 'Email Sender Service'
});


responder.on('Send Email', async (req, done) => {

    try {
        const {emailData} = req;
        await  transporter.sendMail(emailData);

        const result = 'Email has been send';
        await done(result);

    } catch (error) {
        console.log(error)
    }
});