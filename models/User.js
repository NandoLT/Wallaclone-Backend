'use strict'

const mongoose = require('mongoose');


const userSchema = mongoose.Schema ({
    name: {
        type: String,
        index: true
    },
    surname: {
        type: String,
        index:true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;