const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require("./models");

dotenv.config();

const userController = require('./controllers/user.controller');
const healthController = require('./controllers/health.controller');
const authController = require('./controllers/auth.controller');
const msgController = require('./controllers/message.controller');
const authJwt = require("./middleware/authentication.js");

const app = express();
const port = process.env.PORT || 8080;

db.sequelize.sync();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/check', healthController.check);
app.post('/user',  userController.createUser);
app.post('/login', authController.login);

app.post('/messages', [authJwt], msgController.send);
app.get('/messages',  [authJwt], msgController.get);

app.listen(port, () => {
  console.log(`Chat app rest running on port ${port}`);
});
