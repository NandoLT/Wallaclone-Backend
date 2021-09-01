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
const relatedAdvertsNotificactionTemplate = require('../emailTemplates/relatedAdvertsNotification');
// const headerTemplate = require('../emailTemplates/emailHeaderTemplate');
// const footerTemplate = require('../emailTemplates/emailFooterTemplate');

const changeInAdvert = async (updatedAdvert, changeType) => {

    const userList = await searchUsers(updatedAdvert._id);

    const usersEmails = userList.map(user => {
        return user.email;
    });

    let template = '';
    const related = await relatedAds(updatedAdvert);
    const relatedTemplate = relatedAdvertsNotificactionTemplate(related);
    // const header = headerTemplate();
    // const footer = footerTemplate();

    if(changeType.type === 'status') {

        template = changeStatusNotificationTemplate(updatedAdvert, relatedTemplate);
        
    } else {

        template = changePriceNotificationTemplate(updatedAdvert, relatedTemplate);
        
    }
    

    const Data = emailData(process.env.EMAIL_DATA_FROM_NOTIFICATIONS, usersEmails, process.env.EMAIL_DATA_SUBJECT_NOTIFICATIONS, template);
    
    emailSender(Data);
}


const relatedAds = async (advertExample) => {

    const name = advertExample.name;
    const minPrice = advertExample.price * process.env.MIN_PRICE_PERCENTAGE;
    const maxPrice = advertExample.price * process.env.MAX_PRICE_PERCENTAGE;
    const status = 0;
    const advertId = advertExample._id;
    // const tags = advertExample.tags;

    const advert = new Advert();

    const result = await advert.fillByFilters(name, status, minPrice, maxPrice);

    const resultFilter = result.filter( item => {
        if(item._id != advertId.toString()){
            return item;
        } else {
            console.log('REMOVED:', item.name);
        }
      })

    return resultFilter;
}

module.exports = { changeInAdvert, relatedAds };