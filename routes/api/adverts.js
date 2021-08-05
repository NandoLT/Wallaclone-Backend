'use strict';

// local requires
const { Verify } = require('../../libs/jwtAuth');
const { upload } = require('../../libs/awsS3');

// libraries requires
const express = require('express');
const router = express.Router();

const {
    getAdverts,
    getAdvert,
    createAdvert,
    updateAdvert,
    deleteAdvert,
    deleteImage,
    getFavorites,
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
 * DELETE /deleteImage/:userId/:imageName
 * Delete single image
 */
router.delete('/deleteImage/:advertId/:imageName', Verify, deleteImage);

/**
 * GET /getFavorites
 * Get favorites adverts by userId
 */
router.post('/getFavorites', Verify, getFavorites);

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