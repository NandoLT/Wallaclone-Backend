'use strict'
const jwt = require('jsonwebtoken')

module.exports = {
    Verify: (req, res, next) => {
        const jwtToken = req.get('Authorization') || req.query.token || req.body.token

        if (!jwtToken) {
            res.status(401).json({ result: "Unauthorizaed operation. Not valid Token or not provided" });
        }

        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
            if(err) {
                res.status(401).json({ result: "Unauthorizaed operation. Not valid Token or not provided" });
            }
            req.apiAuthUserId = payload._id;
            next()
        })
    },

    Sign: (id, callback) => {
        return jwt.sign({_id: id}, process.env.JWT_SECRET, {expiresIn: '2h'}, callback);
    }
}