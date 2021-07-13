'use strict';

// local requires
const { User } = require('../models');
const jwt = require('jsonwebtoken')

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
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * POST /login
     */
    async login(req, res , next) {
        try {
            const {email, password} = req.body;

            const userResponse = await User.findOne({ email });

            if(!userResponse || !(await userResponse.comparePassword(password))) {
                // const error= new Error('Invalid Credentials')
                // error.status = 401
                // next(error)
                // return
                res.status(401).json({ result: "Invalid Credentials" });
            }

            jwt.sign({_id: userResponse._id}, process.env.JWT_SECRET, {expiresIn: '2h'}, async (err, jwtToken) => {
                if (err) {
                    next(err)
                    return
                }
                res.json({
                    msg: 'Token Created',
                    token: jwtToken,       
                })
            })
            
        } catch (error) {
            res.satus(500).json({ error: error.message });
        }
    }

    /**
     * POST /logout
     */
    async logout(req, res, next) {
        try {
            // por ahora no hay logica por parte de back,
            // simplemente devolvemos un 200 para que front lo gestione
            res.status(200).json({ result: true });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();