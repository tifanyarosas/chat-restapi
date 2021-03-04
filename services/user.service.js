const db = require("../models");

const createUser = async (username, password) => {

  return await db.user.create({
    username: username,
    password: password
  });
}

module.exports = {
  createUser
}