'use strict';

// local requires
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const emailSender = require('../microservices/email/emailSenderRequester.js');
const { Sign } = require('../libs/jwtAuth');

class AuthController {

    /**
     * POST /register
     */
    async register(req, res, next) {
        try {
            const data = req.body;
            const { email, username } = data;
            
            if((User.findOne({ email: email})) || (User.findOne({ username: username }))) {
                console.log('EMAI/USUARIO YA EXISTE');
                const error = new Error;('Email or Username already exist');
                res.json({ error: error.message});
                return;
            } else {
                const user = new User(data);
                
                user.password = await user.hashPassword(user.password);
                const newUser = await user.save();
    
                Sign(newUser._id, (err, jwtToken) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                    }
                    res.json({
                        msg: 'User and Token Created',
                        user: newUser,
                        token: jwtToken,       
                    })
                });
            }
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
                const error= new Error('Invalid Credentials');
                error.status = 401;
                res.status(error.status).json({ error: error.message });
                return;
            }

            Sign(userResponse._id, (err, jwtToken) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                }
                res.json({
                    msg: 'Token Created',
                    token: jwtToken,       
                })
            });
            
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