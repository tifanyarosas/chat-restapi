const userService = require("../services/user.service.js");

/**
 * Creates a user.
 */
module.exports.createUser = async (req, res) => {

	const username = req.body.username;
	const password = req.body.password;

	const validationParams = userService.validateUsernameAndPassword(req.body);
	if (validationParams.error) {
		res.status(400).send({message: "Failed! Username or password is incorrect!"});
		return;
	}

	const duplicateUsers = await userService.validateDuplicateUsers(username);
	if (duplicateUsers) {
		res.status(400).send({message: "Failed! Username or password is incorrect!"});
		return;
	}

	try {
		const newUser = await userService.createUser(username, password);
		res.status(201).json({id: newUser.id});
	} catch (err) {
		res.status(422).json({message: "Failed adding new user!"});
	};
}
