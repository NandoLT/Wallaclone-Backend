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
} = require('../../controllers/authController');

const {
    getUser,
    deleteUser,
    updateUser
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
 * GET /username
 */
router.get('/:username', getUser);

/**
 * DELETE /deleteuser/:userid
 * delete user by id
 */
router.delete('/deleteuser', Verify, deleteUser);

/**
 * PUT /updateUser
 * update user info
 */
router.put('/updateUser', Verify, updateUser);

module.exports = router;