const bcryptjs = require('bcryptjs');
const Joi = require('joi');
const db = require("../models");

const validateDuplicateUsers = async (username) => {
  return await db.user.findOne({ where: { username } });
}

const validateUsernameAndPassword = (req) => {

  const schema = Joi.object({ 
    username: Joi.string() 
          .min(3) 
          .max(30) 
          .required(), 
    password: Joi.string() 
          .min(5) 
          .max(10)
          .required()
  }).options({ abortEarly: false }); 

  return schema.validate(req) 
}

const createUser = async (username, password) => {

  const salt = await bcryptjs.genSaltSync(10);
  const password_hash = await bcryptjs.hashSync(password, salt);

  return await db.user.create({
    username: username,
    password: password_hash
  });
}

module.exports = {
  validateDuplicateUsers,
  validateUsernameAndPassword,
  createUser
}