'use strict';

// local requires
const { Verify } = require('../../libs/jwtAuth');

// libraries requires
const express = require('express');
const router = express.Router();

const {
    addMessage,
    addConversation,
    getConversation,
    getUserConversation,
    getUsersConversation
} = require('../../controllers/chatsController.js');


/**
 * POST / 
 * Add messages conversation
 */