'use strict';

// local requires
const { User } = require('../models');

class ProductsController {

    /**
     * POST /addFavorite
     */
    async addFavorite(req, res, next) {
        console.log("Endpoint to add favorite");    
        const { userId, productId } = req.body;
        const _id = userId;

        const userToFavorite = await User.findOne({ _id });
        userToFavorite.favorites.push(productId);
        await userToFavorite.save();

        res.status(201).json({ result: `${productId} add to ${_id}` });
    }

}

module.exports = new ProductsController();