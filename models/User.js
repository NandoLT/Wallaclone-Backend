'use strict'

// libraries requires
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        unique: true,
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
    password: String,
    favorites: {
      type: Array,
      index: true
    }
});

userSchema.methods.hashPassword = async function(password) {
  return await bcrypt.hash(password, 7);
}

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare( password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;