'use strict'

const userVerify = (userId, authUserId) => {
    console.log(userId);
    console.log(typeof(userId));
    console.log(authUserId);
    console.log(typeof(authUserId));
    console.log( userId === authUserId);
    let verification = false;
    userId === authUserId ? verification = true : verification = false;

    return verification;
}

module.exports = userVerify;