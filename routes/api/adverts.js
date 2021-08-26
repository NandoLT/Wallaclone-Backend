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
    getMyAdverts,
    createAdvert,
    updateAdvert,
    deleteAdvert,
    deleteImage,
    getFavorites,
    getMyFavoriteAdverts,
    addFavorite,
    removeFavorite,
    getTags
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
 * POST /getMyAdverts
 * get all my tags
 */
router.post('/getMyAdverts', getMyAdverts);

/**
 * POST
 * Create advert
 */
router.post('/', Verify, upload, createAdvert);

/**
 * PUT /updateAdvert
 * Update Advert Passing id
 */
router.put('/updateAdvert', Verify, upload, updateAdvert);

/**
 * POST /delete/:id
 * post advert by id
 */
router.post('/delete/:id', Verify, deleteAdvert);

/**
 * POST /deleteImage/:userId/:imageName
 * post single image
 */
router.post('/deleteImage/:advertId/:imageName', Verify, deleteImage);

/**
 * GET /getFavorites
 * Get favorites adverts by userId
 */
router.post('/getFavorites', Verify, getFavorites);

/**
 * GET /getMyFavoriteAdverts
 * Get all  my favorites adverts
 */
router.post('/getMyFavoriteAdverts', Verify, getMyFavoriteAdverts);

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

/**
 * POST /tags
 * get all tags
 */
router.get('/tags', getTags);

module.exports = router;