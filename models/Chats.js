'use strict'

// libraries requires
const mongoose = require('mongoose');

const chatsSchema = mongoose.Schema (
    {
        conversationId: {
            type: String
        },
        members: {
            type: Array
        },
        sender: {
            type: String
        },
        text: {
            type: String
        }
    },
    { timestamps: true }
);

const Chats = mongoose.model('Chats', chatsSchema);

module.exports = Chats;