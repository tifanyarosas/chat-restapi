const Joi = require('joi');
const db = require("../models");

const validateMessage = (message) => {

  const schema = Joi.object({ 
    type: Joi.string()
              .valid('text', 'image', 'video')
              .required(), 
    text: Joi.string()
              .required()
  }).options({ abortEarly: true }); 

  return schema.validate(message) 
  return true
}

const createMessage = async (senderId, recipientId, content) => {

  return await db.message.create({
      senderId: senderId,
      recipientId: recipientId,
      content: content
    });
}

module.exports = {
	validateMessage,
	createMessage
}