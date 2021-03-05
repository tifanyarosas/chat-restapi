const Joi = require('joi');
const db = require("../models");

const validateMessage = (message) => {

  const schema = Joi.object({ 
    type: Joi.string()
              .valid('text', 'image', 'video')
              .required(), 
    text: Joi.string()
      .when('type', { 
        is: 'text', 
        then: Joi.required(), 
        otherwise: Joi.forbidden() 
      }),
    url: Joi.string().when('type', { 
        is: Joi.string().valid('image', 'video'), 
        then: Joi.required(), 
        otherwise: Joi.forbidden() 
      }),
    height: Joi.number().integer().greater(1).when('type', { 
        is: 'image', 
        then: Joi.required(), 
        otherwise: Joi.forbidden() 
      }),
    width: Joi.number().integer().greater(1).when('type', { 
        is: 'image', 
        then: Joi.required(), 
        otherwise: Joi.forbidden() 
      }),
    source: Joi.string().when('type', { 
        is: 'video', 
        then: Joi
          .valid('youtube', 'vimeo')
          .required(), 
        otherwise: Joi.forbidden() 
      })
  }).options({ abortEarly: true }); 

  return schema.validate(message) 
}

const createMessage = async (senderId, recipientId, content) => {

  return await db.message.create({
      senderId: senderId,
      recipientId: recipientId,
      content: content
    });
}

const getMessageByRecipient = async (recipientId, offset, limit) => {

  return await db.message.findAll({
    where: {
      recipientId: recipientId
    },
    offset: offset,
    limit: limit
  });
}

module.exports = {
  validateMessage,
  createMessage,
  getMessageByRecipient
}