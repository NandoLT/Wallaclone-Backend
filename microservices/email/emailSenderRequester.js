'use strict'

const cote = require('cote');

const requester = new cote.Requester({
    name: 'Email Sender'
});


const thumbnailRequester = (emailData) => {

    const request = {
        type: 'Send Email',
        emailData: emailData
    };

    requester.send(request, (done) => {
        console.log('RESPOND', done)
    });
}


module.exports = thumbnailRequester;