'use require'

require('dotenv');
// local requires
const mongoose = require('mongoose');
const { Advert } = require('../models');
const searchUsers = require('./searchUsersNotificactions');
const emailSender = require('../microservices/email/emailSenderRequester.js');

const changeInAdvert = (updatedAdvert, changeType) => {
    if(changeType.type === 'status') {
        switch(changeType.type) {
            case 2:
                changeType.type = 'Reserved';
                break;
            case 3:
                changeType.type = 'Sold';
                break;
        }

        const userList = searchUsers(updatedAdvert.advertId);

        //Generar mensaje de email con to: [array users]
        //Mensaje: ==> llamar a temaplate pasando datos del anuncio
        // GUardar en Data
        const data = '' //temaplate parametrizado
        // llamar microservicio(data);
        emailSender(data);
    } else {
        // En otro caso el tipo de cambio será 'price'
        const userList = searchUsers(updatedAdvert.advertId);
        //Generar mensaje de email con to: [array users]
        //Mensaje: ==> llamar a temaplate pasando datos del anuncio
        // GUardar en Data
        const data = '' //temaplate parametrizado
        // llamar microservicio(data);
        emailSender(data);
    }

    relatedAds(updatedAdvert);
}


const relatedAds = (advertExample) => {
    //extraer datos para pasar a filtros y que me den lista de anuncios similares.
    const name = advertExample.name;
    const minPrice = advertExample.price - process.env.MIN_PRICE_PERCENTAGE;
    const maxPrice = advertExample.price + process.env.MAX_PRICE_PERCENTAGE;
    const status = 0;
    const tags = advertExample.tags;

    const advert = new Advert();

    const result = await advert.fillByFilters(name, status, minPrice, maxPrice, tags);

    // conformar email con listado de anuncios
    //data
    //emilsender(data)


}

module.exports = { changeInAdvert, relatedAds };