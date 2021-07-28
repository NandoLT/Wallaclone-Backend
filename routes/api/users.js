'use strict';

// libraries requires
const express = require('express');
const router = express.Router();

// local requires
const { Verify } = require('../../libs/jwtAuth');

const {
    register,
    login,
    logout,
    recoverPassword,
    resetPassword
} = require('../../controllers/authController');

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

module.exports = router;