'use strict';

// local requires
const { User } = require('../models');
const emailSender = require('../microservices/email/emailSenderRequester.js');
const { Sign } = require('../libs/jwtAuth');
const recoverPassTemplate = require('../emailTemplates/recoverPassTemplate');

class AuthController {

    /**
     * POST /register
     */
    async register(req, res, next) {
        try {
            const data = req.body;
            const { email, name } = data;
            
            if((User.findOne({ email })) || (User.findOne({ name }))) {
                const error = new Error('Email or Username already exist');
                res.status(500).json({ message: error.message});
                return;
            } else {
                const user = new User(data);
                
                user.password = await user.hashPassword(user.password);
                const newUser = await user.save();
    
                Sign(newUser._id, (err, jwtToken) => {
                    if (err) {
                        res.status(500).json({ message: err.message });
                    }
                    res.json({
                        msg: 'User and Token Created',
                        user: newUser,
                        token: jwtToken,       
                    })
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
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
                const error = new Error('Invalid Credentials');
                res.status(401).json({ message: error.message });
                return;
            }

            Sign(userResponse._id, '2h', (err, jwtToken) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.json({
                    msg: 'Token Created',
                    token: jwtToken,       
                })
            });
            
        } catch (error) {
            res.satus(500).json({ message: error.message });
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
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * POST /recoverpassword
     */
    async recoverPassword(req, res, next) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                const error = new Error('User email is incorrect');
                res.status(500).json({ message: error.message });
                return;
            }

            Sign(user._id, '15m', (err, jwtToken) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                
                const template = recoverPassTemplate(user, jwtToken);

                const emailData = {
                    from: 'akkerstudio@gmail.com',
                    to: 'avgvalenzuela@gmail.com',
                    subject: "Recover Password",
                    html: template,
                };

                emailSender(emailData);
                res.status(200).json({ result: true });
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * POST /resetpassword
     */
    async resetPassword(req, res, next) {
        try {
            const { newPassword, confirmNewPassword } = req.body;

            if (newPassword !== confirmNewPassword) {
                res.status(500).json({ message: "The passwords doesn't match" });
                return;
            }

            const _id = req.apiAuthUserId;
            const user = await User.find({ _id });

            user.password = newPassword;
            user.save();
            res.status(200).json({ result: true });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();