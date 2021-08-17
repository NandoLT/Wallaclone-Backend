'use strict';

// local requires
const { User, Advert } = require('../models');
const { deleteMultipleImages, deleteSingleImage } = require('../libs/awsS3');
const userVerify  = require('../libs/userVerify');

// libraries requires
require('dotenv');
const mongoose = require('mongoose');

class UsersController {

    /**
     * GET /:username
     */
    async getUser(req, res, next) {
        try {
            const user = req.params.username;
            const { name, surname, email } = await User.findOne({name: user})
            const userNoPassword = { name, surname, email };

            res.status(200).json({ result: userNoPassword });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * DELETE /
     */
    async deleteUser(req, res, next) {
        
        try {
            const userId = req.apiAuthUserId;

            await User.deleteOne({ _id: userId });
    
            // Borramos el id de esos anuncios en los favoritos de todos los usuarios
            //Añadir notificación de aviso para usuarios de que determinado producto ha desaparecido de sus favoritos
            // Sacar esta operación fuera para evitar que la app se quedé colgada en este punto
            const advertsToDelete = await Advert.find({ userId: { $in: userId }});
            const advertsIds = advertsToDelete.map( advert => advert._id.toString()); 
            const usersRemoveFavorites = await User.find({ favorites: { $in: advertsIds  }}); 

            if(usersRemoveFavorites.length !== 0) {
                advertsIds.forEach(advert => {
                    usersRemoveFavorites.forEach(async favorite => {
                        const index = favorite.favorites.indexOf(advert);
                        if (index > -1) {
                            favorite.favorites.splice(index, 1);
                            await favorite.save();
                        }
                    });
                });
            }
    
            // Borramos todos los anuncios de ese usuario
            await Advert.deleteMany({ userId: { $in: userId } });

            // TODO: Hay que borrar las imagenes asociadas a esos anuncios en S3

            res.status(200).json( {
                result: "Delete user succesfuly",
                user: userId,
                related_Ads: advertsToDelete,
                remove_from_favs: `${usersRemoveFavorites.length} times`
            });
        } catch (error) {
            res.status(500).json({ message: error.message });    
        }
    }

    async updateUser(req, res, next) {
        const data = req.body;
        const authUserId = req.apiAuthUserId;
        const filter = { _id: authUserId };

        try {        
            const updateUser = await User.findOneAndUpdate(filter, data, {
                new: true
            });
            res.status(201).json({ result: updateUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UsersController();