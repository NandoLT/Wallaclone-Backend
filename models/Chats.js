'use strict'

// libraries requires
const mongoose = require('mongoose');

const chatsSchema = mongoose.Schema ({

});

const Chats = mongoose.model('Chats', chatsSchema);

module.exports = Chats;