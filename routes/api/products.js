'use strict';

// libraries requires
const express = require('express');
const router = express.Router();

/**
 * POST /addFavorite
 * Add favorites products to specific user
 */
router.post('/addFavorite', require('../../controllers/productsController').addFavorite);
router.post('/removeFavorite', require('../../controllers/productsController').removeFavorite);

module.exports = router;