'use strict';

// local requires
const { Verify } = require('../../libs/jwtAuth');
const { upload } = require('../../libs/awsS3');

// libraries requires
const path = require('path');
const express = require('express');
const router = express.Router();

const {
    getAdverts,
    getAdvert,
    createAdvert,
    updateAdvert,
    deleteAdvert,
    addFavorite,
    removeFavorite,
} = require('../../controllers/advertsController')

/**
 * GET /
 * Get adverts
 */
router.get('/', getAdverts);

/**
 * GET /:id
 * Get advert by id
 */
router.get('/:id', getAdvert);

/**
 * POST
 * Create advert
 */
router.post('/', Verify, upload.single('photo'), createAdvert);

/**
 * PUT /updateAdvert
 * Update Advert Passing id
 */
router.put('/updateAdvert', Verify, updateAdvert);

/**
 * DELETE /delete/:id
 * Delete advert by id
 */
router.delete('/delete/:id', Verify, deleteAdvert);


/**
 * POST /addFavorite
 * Add favorites advert to specific user
 */
router.post('/addFavorite', Verify, addFavorite);
/**
 * POST /removeFavorite
 * Remove advert from favorites to specific user
 */
router.post('/removeFavorite', Verify, removeFavorite);

module.exports = router;