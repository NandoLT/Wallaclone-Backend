'use require'
// local requires
const mongoose = require('mongoose');
const { User, Advert } = require('../models');
const searchUsers = require('./searchUsersNotificactions');
const emailSender = require('../microservices/email/emailSenderRequester.js');

const changeInAdvert = (advertId, changeType) => {
    if(changeType.type === 'status') {
        switch(changeType.type) {
            case 2:
                changeType.type = 'Reserved';
                break;
            case 3:
                changeType.type = 'Sold';
                break;
        
        const userList = searchUsers(advertId);

        //Generar mensaje de email con to: [array users]
        //Mensaje: ==> llamar a temaplate pasando datos del anuncio
        // GUardar en Data
        const data = '' //temaplate parametrizado
        // llamar microservicio(data);
        emailSender(data);
        }
    } else {
        // En otro caso el tipo de cambio será 'price'
        const userList = searchUsers(advertId);
        //Generar mensaje de email con to: [array users]
        //Mensaje: ==> llamar a temaplate pasando datos del anuncio
        // GUardar en Data
        const data = '' //temaplate parametrizado
        // llamar microservicio(data);
        emailSender(data);
    }
}


const relatedAds = () => {
}

module.exports = { changeInAdvert, relatedAds };