'use strict'

const userVerify = (userId, authUserId) => {
    
    let verification = false;
    userId === authUserId ? verification = true : verification = false;

    return verification;
}

module.exports = userVerify;