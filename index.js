const express = require('express');
const dotenv = require('dotenv');
const db = require("./models");

dotenv.config();

const userController = require('./controllers/user.controller');
const healthController = require('./controllers/health.controller');
const authController = require('./controllers/auth.controller');
const msgController = require('./controllers/message.controller');

const app = express();
const port = process.env.PORT || 8080;

db.sequelize.sync();

app.post('/check', healthController.check);
app.post('/user',  userController.createUser);
app.post('/login', authController.login);

// TODO: these endpoints should be secured
app.post('/messages', msgController.send);
app.get('/messages',  msgController.get);

app.listen(port, () => {
  console.log(`Chat app rest running on port ${port}`);
});
