'use strict';

// local requires
const mongoose = require('mongoose');
const { User, Advert } = require('../models');
const emailSender = require('../microservices/email/emailSenderRequester.js');
const userVerify = require('../libs/userVerify.js');

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
     * GET /:id
     */
    async getAdvert(req, res, next) {

        try {

            const _id = req.params.id;  
            if ( mongoose.isValidObjectId(_id) ) {
                const advertDetail = await Advert.findOne({ _id });
                res.status(200).json({ result: advertDetail });
            } else {
                res.status(404).json( { error: 'Not found' });
                return;
            }

        } catch (error) {

            res.status(500).json({ error: error.message });

        }
    }

    /**
     * POST /
     */
    async createAdvert(req, res, next) {
        try {
            const data = req.body;
            const file = data.photo;
            if (data.status > 3) {
                res.json({ error : 'The status must be a number between 0 and 3' });
            }

            const advert = new Advert(data);
            advert.photo = file.filename;

            const newAdvert = await advert.save();
            res.status(201).json({ result: newAdvert });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * PUT /updateAdvert
     */
    async updateAdvert(req, res, next) {
        const data = req.body;
        const filter = { _id: data.productId };
        const authUserId = req.apiAuthUserId;
        const userValidation = userVerify(data.userId, authUserId );
        console.log('DATA', data);
        console.log('filter', filter);
        console.log('AUTHUSERID', authUserId);
        console.log('USERVALIDATION', userValidation);
        if(userValidation) {
            try {
                if (data.status > 3) {
                    res.json({ error : 'The status must be a number between 0 and 3' });
                }
        
                const updatedAdvert = await Advert.findOneAndUpdate(filter, data, {
                    new: true
                });
    
                res.status(201).json({ result: updatedAdvert });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(401).json({ result: 'User verification invalid' });
        }

        
    }

    /**
     * DELETE /delete/:id
     */
    async deleteAdvert(req, res, next) {
    
        const advert = req.params.id;
        const advertOwner = await  Advert.findOne({ _id: advert });
        const authUserId = req.apiAuthUserId;
        const userValidation = userVerify(advertOwner.userId, authUserId );

        if(userValidation) {
            try {
                await Advert.deleteOne ({ _id: advert });
                res.status(200).json({ result: `Product ${advert} deleted successfully`});
            } catch (error) {
                res.status(500).json({ result: message.error });
            }
        } else {
            res.status(401).json({ result: 'User verification invalid' });
        }

    }

    /**
     * POST /addFavorite
     */
    async addFavorite(req, res, next) {        

        const { userId, productId } = req.body;
        const authUserId = req.apiAuthUserId;
        const userValidation = userVerify(userId, authUserId );

        if( userValidation ) {
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