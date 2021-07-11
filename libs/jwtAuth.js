'use strict'
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token

    if (!jwtToken) {

        res.status(401).json({ result: "Unauthorizaed operation. Not valid Token or not provided" })
            return
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
        if(err) {
            err.status = 401
            next(err)
            return
        }

        req.apiAuthUserId = payload._id
        next()
    })
}