'use strict';

// local requires
const { User } = require('../models');

class ProductsController {

    /**
     * POST /addFavorite
     */
    async addFavorite(req, res, next) {
        
        try {
   
            const { userId, productId } = req.body;
            const _id = userId;
    
            const userToFavorite = await User.findOne({ _id });
            userToFavorite.favorites.push(productId);
            await userToFavorite.save();
    
            res.status(201).json({ result: `${productId} add to ${_id}` });
            
        } catch (error) {
            
            res.status(500).json({ result: `Problems to add product ${productId} in user ${_id}`})

        }

    }

    async removeFavorite(req, res, next) {
        
        try {

            const { userId, productId } = req.body;
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
    }

}

module.exports = new ProductsController();