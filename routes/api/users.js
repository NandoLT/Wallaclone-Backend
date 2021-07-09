'use strict';

// libraries requires
const express = require('express');
const router = express.Router();

/**
 * POST /register
 * register new user
 */
router.post('/register', require('../../controllers/authController').register);

/**
 * POST /login
 * user login
 */
router.post('/login', require('../../controllers/authController').login);

/**
 * POST /logout
 * user logout
 */
router.post('/logout', require('../../controllers/authController').logout);

module.exports = router;