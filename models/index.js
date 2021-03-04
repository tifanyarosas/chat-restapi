const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
	process.env.DATABASE_NAME || 'chatdb', 
	process.env.DATABASE_USER, 
	process.env.DATABASE_PASSWORD,
	{
		storage: process.env.DATABASE_STORAGE || ':memory:',
		dialect: 'sqlite',
		host: process.env.DATABASE_HOST || 'localhost'
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.js')(sequelize, Sequelize);
db.message = require('./message.js')(sequelize, Sequelize);

db.message.belongsTo(db.user, { foreignKey: 'recipientId' });
db.message.belongsTo(db.user, { foreignKey: 'senderId' });

module.exports = db;