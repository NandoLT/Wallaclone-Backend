'use strict';

// local requires
require('dotenv');
const mongoose = require('mongoose');
const { User, Advert } = require('../models');
const emailSender = require('../microservices/email/emailSenderRequester.js');
const userVerify = require('../libs/userVerify.js');
const { deleteMultipleImages, deleteSingleImage } = require('../libs/awsS3');
const { changeInAdvert } = require('../libs/advertsNotifications');

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
                province,
                skip,
                limit,
                sort
            } = req.query;
            const advert = new Advert();

            const result = await advert.fillByFilters(name, status, minPrice, maxPrice, tags, province, skip, limit, sort);
            const totalFilteredAdverts = await advert.countByFilters(name, status, minPrice, maxPrice, tags, province, 0, 0, sort);
            const totalAdverts = await advert.countByFilters(null, null, null, null, null, null, 0, 0, null);

            res.status(200).json({ result, totalFilteredAdverts, totalAdverts });
        } catch (error) {
            res.status(500).json({ message: error.message });
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
                res.status(404).json( { message: 'Not found' });
                return;
            }

        } catch (error) {

            res.status(500).json({ message: error.message });

        }
    }

    /**
     * POST /getMyAdverts
     */
    async getMyAdverts(req, res, next) {
        try {
            const userId = req.apiAuthUserId;
            const adverts = await Advert.find({ userId });
            
            res.status(200).json({ result: adverts });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * POST /getMyFavoriteAdverts
     */
    async getMyFavoriteAdverts(req, res, next) {
        try {
            const _id = req.apiAuthUserId;
            const user = await User.findOne({ _id });
            const favoriteAdvertsIds = user.favorites;

            const result = await Advert.find({_id: {$in: favoriteAdvertsIds }})

            res.status(200).json({ result });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * POST /
     */
    async createAdvert(req, res, next) {
        const data = req.body;
        const userId = req.apiAuthUserId;
        data.userId = userId;
        
        try {
            const file = req.file;
            if (data.status > 3) {
                res.json({ message : 'The status must be a number between 0 and 3' });
            }

            const advert = new Advert(data);

            if (file) {
                advert.photo.push(file.originalname);
            }

            const newAdvert = await advert.save();
            res.status(201).json({ result: newAdvert });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * PUT /updateAdvert
     */
    async updateAdvert(req, res, next) {
        const data = req.body;
        const filter = { _id: data.productId };
        const authUserId = req.apiAuthUserId;

        const { userId } = await Advert.findById(filter);

        const userValidation = userVerify(userId, authUserId );

        if(userValidation) {
            try {
                const file = req.file;
                if (data.status > 3) {
                    res.json({ message : 'The status must be a number between 0 and 3' });
                }
                
                if (file) {
                    data.photo = [];
                    data.photo.push(file.originalname);
                }

                const updatedAdvert = await Advert.findOneAndUpdate(filter, data);
                // const updatedAdvert = await Advert.findOneAndUpdate(filter, data, {
                //     new: true
                // });
                console.log('DATA',data);
                console.log('UPDATED ADVERT', updatedAdvert);
                console.log('condicional', ( updatedAdvert.status.toString() === '3' || updatedAdvert.status.toString() === '2'), (data.status.toString() !== updatedAdvert.status.toString()))
                console.log('condicional partido', updatedAdvert.status.toString(), updatedAdvert.status.toString(), data.status.toString(), updatedAdvert.status.toString());
                if(( updatedAdvert.status.toString() === '3' || updatedAdvert.status.toString() === '2') && (data.status.toString() !== updatedAdvert.status.toString())) {
                    console.log('condicional', ( updatedAdvert.status.toString() === '3' || updatedAdvert.status.toString() === '2'), (data.status.toString() !== updatedAdvert.status.toString()))
                    changeInAdvert(updatedAdvert, 'status' );
                }
                
                if(updatedAdvert.price.toString() !== data.price.toString()) {
                    console.log('PRICE CHANGE');
                    changeInAdvert(updatedAdvert, 'price' );
                }
    
                res.status(201).json({ result: updatedAdvert });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        } else {
            res.status(401).json({ message: 'User verification invalid' });
        }
    }

    /**
     * POST /delete/:id
     */
    async deleteAdvert(req, res, next) {
        const advert = req.params.id;
        const { userId, photo } = await  Advert.findOne({ _id: advert });
        const authUserId = req.apiAuthUserId;
        const userValidation = userVerify(userId, authUserId);

        if(userValidation) {
            try {
                await Advert.deleteOne ({ _id: advert });
                await deleteSingleImage(process.env.AWS_S3_BUCKET, `${userId}/${photo[0]}`)
                /// TODO:  Incluir borrado de id de anuncio del campo favorite de los usuarios que lo tengan 
                /// TODO:  añadido así como una notificación de que se ha borrado ese anuncio y ya no le aparecerá en favorites
                res.status(200).json({ result: `Product ${advert} deleted successfully`});
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        } else {
            res.status(401).json({ message: 'User verification invalid' });
        }

    }

    /**
     * POST /deleteImage/:advertId/:imageName
     */
    async deleteImage(req, res, next){
        const _id = req.params.advertId;
        const imageName = req.params.imageName;

        const imageAdvert = await Advert.findById({ _id });

        const authUserId = req.apiAuthUserId;
        const userValidation = userVerify(imageAdvert.userId, authUserId);

        if (userValidation) {
            try {
                imageAdvert.photo.pop();
                imageAdvert.save();

                await deleteSingleImage(`${process.env.AWS_S3_BUCKET}`, `${_id}/${imageName}`);

                res.json({ result: 'Image deleted succesfuly' });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        } else {
            res.status(401).json({ message: 'User verification invalid' });
        }
    }

    /**
     * GET /getFavorites
     */
    async getFavorites(req, res, next) {
        const _id = req.apiAuthUserId;
        try {
            const user = await User.findOne({ _id });
            res.json({ result: user.favorites });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * POST /addFavorite
     */
    async addFavorite(req, res, next) {        

        const { advertId } = req.body;
        const authUserId = req.apiAuthUserId;

        try {   
            const _id = authUserId;
    
            const userToFavorite = await User.findOne({ _id });
            userToFavorite.favorites.push(advertId);
            await userToFavorite.save();
    
            res.status(200).json({ result: `${advertId} add to ${_id}` });            
        } catch (error) {            
            res.status(500).json({ message: `Problems to add product ${advertId} in user ${_id}`})
        }
    }


    /**
     * POST /removeFavorite
     */
    async removeFavorite(req, res, next) {  

        const { advertId } = req.body;
        const authUserId = req.apiAuthUserId;

        try {
            const _id = authUserId;

            const removeFromFavorites = await User.findOne({ _id });
            const index = removeFromFavorites.favorites.indexOf(advertId);
            if (index > -1) {
                removeFromFavorites.favorites.splice(index, 1);
            }

            await removeFromFavorites.save();

            res.status(200).json({ result: `${advertId} remove from ${_id}` })            
        } catch (error) {
            res.status(500).json({ message: `Problems to remove product ${advertId} from user ${_id}`})
        }
    }

    /**
     * POST /tags
     */
    async getTags(req, res, next) {
        // por ahora solo es esta lista cerrada
        const tags = ['Móvil', 'Tecnologia', 'Deporte'];
        res.status(200).json({ result: tags });
    }
}

module.exports = new AdvertsController();