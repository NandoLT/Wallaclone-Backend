'use strict';

// local requires
const { User, Advert } = require('../models');
const { deleteMultipleImages, deleteSingleImage } = require('../libs/awsS3');

// libraries requires
require('dotenv');
const mongoose = require('mongoose');

class UsersController {

    /**
     * DELETE /
     */
    async deleteUser(req, res, next) {

        const userId = req.apiAuthUserId;

        // Primero borramos al usuario
        await User.deleteOne({ _id: userId });

        // Borramos el id de esos anuncios en los favoritos de todos los usuarios
        // Sacar esta operación fuera para evitar que la app se quedé colgada en este punto
        const { _id: advertsToDelete } = await Advert.find({ userId: { $in: userId }});
        const { favorites } = await User.find({ _id: { $nin: userId } });

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
        
    }
}

module.exports = new UsersController();