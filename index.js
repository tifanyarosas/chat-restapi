const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require("./models");

dotenv.config();

if (!process.env.JWT_SECRET_KEY) {
  console.error("JWT_SECRET_KEY is not set");
  process.exit(1);
}

if (!process.env.DATABASE_USER) {
  console.error("DATABASE_USER is not set");
  process.exit(1);
}

if (!process.env.DATABASE_PASSWORD) {
  console.error("DATABASE_PASSWORD is not set");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 8080;

db.sequelize.sync();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require("./routes")(app);

app.listen(port, () => {
  console.log(`Chat app rest running on port ${port}`);
});
