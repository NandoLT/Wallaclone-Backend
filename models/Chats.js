'use strict'

// libraries requires
const mongoose = require('mongoose');

const chatsSchema = mongoose.Schema (
    {
        conversationId: {
            type: String,
            unique: true
        },
        members: {
            type: Array
        },
        conversation: {
            type: Array
        }, 
        productId: {
            type: String
        }
    },
);

const Chats = mongoose.model('Chats', chatsSchema);

module.exports = Chats;

//conversation es un array de objetos con campos sender y text y timestamp