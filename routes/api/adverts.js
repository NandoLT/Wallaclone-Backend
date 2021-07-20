'use strict';

// local requires
const jwtAuth = require('../../libs/jwtAuth');

// libraries requires
const express = require('express');
const router = express.Router();

const {
    getAdverts,
    addFavorite,
    removeFavorite,
    emailTest,
} = require('../../controllers/advertsController')

/**
 * GET /
 * Get adverts
 */
router.get('/', getAdverts);

/**
 * POST /addFavorite
 * Add favorites advert to specific user
 */
router.post('/addFavorite', jwtAuth, addFavorite)
/**
 * POST /removeFavorite
 * Remove advert from favorites to specific user
 */
router.post('/removeFavorite', jwtAuth, removeFavorite)

module.exports = router;