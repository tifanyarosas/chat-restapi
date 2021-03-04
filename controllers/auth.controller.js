const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const secretKey = require("../config/auth.config.js");
const db = require("../models");

/**
 * Login allows the user to authenticate with credentials 
 * and get a token to use on secured endpoints. 
 */
module.exports.login = async (req, res) => {
  	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password) {
		res.status(400).send({message: "Failed! Missing required parameters"});
		return;
	}

  	const user = await db.user.findOne({ where: { username } });
  	if (user) {
  		const equalPasswords = bcryptjs.compareSync(password, user.password);
        if (equalPasswords) {
			res.status(200).json({
				id: user.id,
				token: generateToken(user.id)
			});
		} else {
			res.status(400).send({message: "Failed! Username or password is incorrect"});
		}
	} else {
		res.status(400).send({message: "Failed! Username or password is incorrect"});
	}
};

function generateToken(userId) {
	const payload = {
		id: userId
	}
	return jwt.sign(payload, secretKey, { expiresIn: 1440 });
}
