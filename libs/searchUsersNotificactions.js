'use strict'
//local requires
const mongoose = require('mongoose');
const { User } = require('../models');

const searchUsers = async (advertId) => {
    
    const userList = await User.find({ favorites: { $in: [advertId.toString()] } });
    
    return userList;
}

module.exports = searchUsers;