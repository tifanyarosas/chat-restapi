const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require("./models");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

db.sequelize.sync();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require("./routes")(app);

app.listen(port, () => {
  console.log(`Chat app rest running on port ${port}`);
});
