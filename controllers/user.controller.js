const userService = require("../services/user.service.js");

/**
 * Creates a user.
 */
module.exports.createUser = async (req, res) => {

	const username = req.body.username;
	const password = req.body.password;

	try {
		const newUser = await userService.createUser(username, password);
		res.status(201).json({id: newUser.id});
	} catch (err) {
		res.status(422).json({message: "Failed adding new user!"});
	};
}
