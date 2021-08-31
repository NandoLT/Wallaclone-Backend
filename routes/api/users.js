'use strict';

// libraries requires
const express = require('express');
const router = express.Router();

// local requires
const { Verify } = require('../../libs/jwtAuth');
const { upload } = require('../../libs/awsS3');

const {
    register,
    login,
    logout,
    recoverPassword,
    resetPassword
} = require('../../controllers/authController');

const {
    getUser,
    getUserImage,
    getUserAndAdverts,
    deleteUser,
    updateUser,
    uploadUserImage
} = require('../../controllers/usersControllers');

/**
 * POST /register
 * register new user
 */
router.post('/register', register);

/**
 * POST /login
 * user login
 */
router.post('/login', login);

/**
 * POST /logout
 * user logout
 */
router.post('/logout', logout);

/**
 * POST /recoverpassword
 */
router.post('/recoverpassword', recoverPassword);

/**
 * POST /recoverpassword
 */
router.post('/resetpassword', Verify, resetPassword);

/**
 * GET /
 */
router.get('/', Verify, getUser);

/**
 * GET /getUserImage
 * get user image
 */
router.get('/getUserImage', Verify, getUserImage );

/**
 * GET /username
 */
router.get('/:nickname', Verify, getUserAndAdverts);


/**
 * DELETE /deleteuser/:userid
 * delete user by id
 */
router.delete('/deleteuser', Verify, deleteUser);

/**
 * PUT /updateUser
 * update user info
 */
router.put('/updateuser', Verify, upload, updateUser);

/**
 * POST /userImage
 * upload user image
 */
router.post('/userImage', Verify, upload, uploadUserImage );



module.exports = router;