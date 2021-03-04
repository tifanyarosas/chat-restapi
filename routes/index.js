const authJwt = require("../middleware/authentication.js");
const userController = require('../controllers/user.controller');
const healthController = require('../controllers/health.controller');
const authController = require('../controllers/auth.controller');
const msgController = require('../controllers/message.controller');

module.exports = function(app) {

  app.post('/check', healthController.check);
  app.post('/user',  userController.createUser);
  app.post('/login', authController.login);
  app.post('/messages', [authJwt], msgController.send);
  app.get('/messages', [authJwt], msgController.get);
};