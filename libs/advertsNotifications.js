'use require'

require('dotenv');
const mongoose = require('mongoose');

// local requires
const { Advert } = require('../models');
const searchUsers = require('./searchUsersNotificactions');
const emailSender = require('../microservices/email/emailSenderRequester.js');
const emailData = require('../libs/emailData');
const changePriceNotificationTemplate = require('../emailTemplates/changePriceNotification');
const changeStatusNotificationTemplate = require('../emailTemplates/changeStatusnotification');

const changeInAdvert = async (updatedAdvert, changeType) => {

    const userList = await searchUsers(updatedAdvert._id);

    const usersEmails = userList.map(user => {
        return user.email;
    });

    let template = ''

    if(changeType.type === 'status') {

        template = changeStatusNotificationTemplate(updatedAdvert);
        
    } else {

        template = changePriceNotificationTemplate(updatedAdvert);

    }
    
    const Data = emailData(process.env.EMAIL_DATA_FROM_NOTIFICATIONS, usersEmails, process.env.EMAIL_DATA_SUBJECT_NOTIFICATIONS, template);
    
    emailSender(Data);

    //relatedAds(updatedAdvert);
}


const relatedAds = async (advertExample) => {
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