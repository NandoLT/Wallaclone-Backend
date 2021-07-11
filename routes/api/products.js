'use strict';

// local requires
const jwtAuth = require('../../libs/jwtAuth');

// libraries requires
const express = require('express');
const router = express.Router();

const {
    addFavorite,
    removeFavorite,
} = require('../../controllers/productsController')

/**
 * POST /addFavorite
 * Add favorites products to specific user
 */
router.post('/addFavorite', jwtAuth, addFavorite)
/**
 * POST /removeFavorite
 * Remove product from favorites to specific user
 */
router.post('/removeFavorite', jwtAuth, removeFavorite)

module.exports = router;