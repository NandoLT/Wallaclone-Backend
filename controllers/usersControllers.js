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

            // Primero borramos al usuario
            await User.deleteOne({ _id: userId });
    
            // Borramos el id de esos anuncios en los favoritos de todos los usuarios
            // Sacar esta operación fuera para evitar que la app se quedé colgada en este punto
            const { _id: advertsToDelete } = await Advert.find({ userId: { $in: userId }});
            const { favorites } = await User.find({ _id: { $nin: userId }, favorites: { $in: [advertsToDelete]} });
    
            console.log('Lista de anuncios para borrar en favs', advertsToDelete);
            advertsToDelete.forEach(advert => {
                favorites.forEach(favorite => {
                    const index = favorites.indexOf(favorite);
                    if (index > -1) {
                        favorites.splice(index, 1);
                    }
                });
            });
    
            // Borramos todos los anuncios de ese usuario
            await Advert.deleteMany({ userId: { $in: userId } });

            res.status(200).json( {
                result: "Delete user succesfuly",
                user: userId,
                related_Ads: advertsToDelete,
                remove_from_favs: `${favorites.length} times`
            });
        } catch (error) {
            res.status(500).json({ message: error.message });    
        }
    }

    async updateUser(req, res, next) {
        const data = req.body;
        const authUserId = req.apiAuthUserId;
        const filter = { _id: authUserId };

        // const { _id: userId } = await User.findOne( filter );

        // const userValidation = userVerify(JSON.stringify(userId), JSON.stringify(authUserId) );

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