'use strict';

// libraries requires
const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout,
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

module.exports = router;