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

        // Borramos todos los anuncios de ese usuario

        await Advert.deleteMany({ userId: { $in: userId } });

        // Borramos el id de esos anuncios en los favoritos de todos los usuarios

        
    }
}

module.exports = new UsersController();