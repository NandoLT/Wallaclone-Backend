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
router.post('/', Verify, addMessage);

/**
 * POST /addConversation
 * Post Conversations Ids to sender a receiver
 */
router.post('/addConversation', Verify, addConversation);


/**
 * GET /messages/:conversationId
 * Get message history of a conversation
 */
router.get('/messages/:conversationId', Verify, getConversation);

/**
 * GET /members/:userId
 * Get conversations where userId is in members array
 */
router.get('/members/:userId', Verify, getUserConversation);


/**
 *  GET /find/:firstUserId/:secondUserId
 * Get conversations where user one and user two are in members array
 */
router.get('/find/:firstUserId/:secondUserId', Verify, getUsersConversation);

module.exports = router;