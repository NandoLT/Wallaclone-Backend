'use strict';

// libraries requires
require('dotenv');
const mongoose = require('mongoose');

// local requires
const { Chats, User } = require('../models');


class ChatsController {

    //Messages actions//

    /**
     * POST / 
     */
    async addMessage (req, res) {
      // REVISAR EL FRONT PORQUE PARECE QUE MANDA UN OBJETO message
      // DONDE INCLUYE EL CONVERSATIONid QUE DEBERÍA VALER PARA GUARDAR EL  MENSAJE
      // EN SU LUGAR CORRECTO
        const newMessage = new Chats(req.body); 
      
        try {
          const savedMessage = await newMessage.save();
          res.status(200).json({ result:savedMessage });
        } catch (error) {
          res.status(500).json({ message: error });
        }
      }
      
      /**
       * GET /:conversationId
       */
      
      async getConversation (req, res) {
        try {
          const messages = await Chats.find({ 
            conversationId: req.params.conversationId,
          });
          res.status(200).json({ result: messages });
        } catch (error) {
            res.status(500).json({ message: error });
        }
      }

    //Conversations actions//

    //new conv
    /**
     * POST /addConversation
     */
    async addConversation (req, res) {
            const newConversation = new Chats({
              members: [req.body.senderId, req.body.receiverId],
            });
        
            try {
              const savedConversation = await newConversation.save();
              res.status(200).json({ result: savedConversation });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
  
    //get conv of a user
    /**
     * GET /:userId
     */
    async getUserConversation (req, res) {
        try {
            const conversation = await Chats.find({
                members: { $in: [req.params.userId] },
            });
            res.status(200).json({ result: conversation });
        } catch (error) {
            res.status(500).json({message: error });
        }
    };
    
    // get conv includes two userId
    /**
     * GET /find/:firstUserId/:secondUserId
     */
    async getUsersConversation (req, res) {
        try {
            const conversation = await Chats.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            });
            res.status(200).json({ result: conversation });
        } catch (error) {
            res.status(500).json({message: error });
        }
    };
}

module.exports = new ChatsController();