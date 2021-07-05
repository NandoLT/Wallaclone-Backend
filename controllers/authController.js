'use strict';

// local requires
const { User } = require('../models');

class AuthController {

    /**
     * POST /register
     */
    async register(req, res, next) {
        try {
            const data = req.body;
            const user = new User(data);
            
            user.password = await user.hashPassword(user.password);
            const newUser = await user.save();

            res.status(201).json({ result: newUser });
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

}

module.exports = new AuthController();