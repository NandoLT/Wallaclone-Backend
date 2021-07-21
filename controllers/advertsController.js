'use strict';

// local requires
const { User, Advert } = require('../models');
const emailSender = require('../microservices/email/emailSenderRequester.js');
const userVerify = require('../libs/userVerify.js')

class AdvertsController {

    /**
     * GET /
     */
    async getAdverts(req, res, next) {
        try {
            const { 
                name, 
                status, 
                minPrice, 
                maxPrice, 
                tags, 
                skip, 
                limit, 
                sort 
            } = req.query;
            const advert = new Advert();

            const result = await advert.fillByFilters(name, status, minPrice, maxPrice, tags, skip, limit, sort);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * POST /addFavorite
     */
    async addFavorite(req, res, next) {        

        const { userId, productId } = req.body;
        const authUserId = req.apiAuthUserId;
        const userValidation = userVerify(userId, authUserId );

        if( userValidation ){
            try {   
                const _id = userId;
        
                const userToFavorite = await User.findOne({ _id });
                userToFavorite.favorites.push(productId);
                await userToFavorite.save();
        
                res.status(201).json({ result: `${productId} add to ${_id}` });
                
            } catch (error) {            
                res.status(500).json({ result: `Problems to add product ${productId} in user ${_id}`})
            }
        } else {
            res.status(401).json({ result: 'User verification invalid' });
        }
    }


    /**
     * POST /removeFavorite
     */
    async removeFavorite(req, res, next) {  

        const { userId, productId } = req.body;
        const authUserId = req.apiAuthUserId;
        const userValidation = userVerify(userId, authUserId );

        if(userValidation) {
            try {
                const _id = userId;
    
                const removeFromFavorites = await User.findOne({ _id });
                const index = removeFromFavorites.favorites.indexOf(productId);
                if (index > -1) {
                    removeFromFavorites.favorites.splice(index, 1);
                }
                await removeFromFavorites.save();
    
                res.status(200).json({ result: `${productId} remove from ${_id}` })
                
            } catch (error) {
                res.status(500).json({ result: `Problems to remove product ${productId} from user ${_id}`})
            }
        } else {
            res.status(401).json({ result: 'User verification invalid' });
        }
    }

}

module.exports = new AdvertsController();