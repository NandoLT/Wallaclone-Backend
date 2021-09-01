'use strict';

// libraries requires
require('dotenv');
const mongoose = require('mongoose');

// local requires
const { Chats } = require('../models');


class ChatsController {

    //Messages actions//

    /**
     * POST / 
     */
    async addMessage (req, res) {

      const filter = req.body.conversationId;
      const { sender, text } = req.body; 
      const dataMessage = { sender, text }
      
      try {
        const conversation = await Chats.findOne({conversationId: filter});
        conversation.conversation.push(dataMessage);
        conversation.save() 
        res.status(200).json({ result:conversation });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    }
      
      /**
       * GET /messages/:conversationId/:productId
       */
      
    async getConversation (req, res) {
      try {
        const messages = await Chats.find({ 
          conversationId: req.params.conversationId,
          productId: req.params.productId
        });
        res.status(200).json({ result: messages });
      } catch (error) {
          res.status(500).json({ message: error });
      }
    }

    //Users Conversations actions//

    //new conv
    /**
     * POST /addConversation
     */
    async addConversation (req, res) {

      const conversationData = {
        conversationId: req.body.conversationId,
        members: [req.body.senderId, req.body.receiverId], 
        productId: req.body.productId
      }
      const newConversation = new Chats(conversationData);
        
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
     * GET /find/:firstUserId/:secondUserId/:productId
     */
    async getUsersConversation (req, res) {
      const productId = req.params.productId;

      try {
        const conversation = await Chats.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            productId
        });
        res.status(200).json({ result: conversation });
      } catch (error) {
        res.status(500).json({message: error });
      }
    };
}

module.exports = new ChatsController();