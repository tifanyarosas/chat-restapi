const messageService = require('../services/message.service.js');

/**
 * Send a message from one user to another. 
 * We support three types of messages `text`, `image` and `video` 
 */
module.exports.send = async (req, res) => {

	const validationParams = messageService.validateMessage(req.body.content);
	if (validationParams.error) {
		res.status(400).send({message: "Failed! Invalid message", details: validationParams.error.details});
		return;
	}

	try {
		const createdMessage = await messageService.createMessage(
			req.body.sender,
			req.body.recipient,
			req.body.content
		);
  		res.status(200).json({id: createdMessage.id, timestamp: createdMessage.timestamp});
  	} catch(err) {
  		res.status(422).json({message: "Failed sending the message!"});
  	};
}

/**
 * Fetch all existing messages to a given recipient, within a range of message IDs.
 */
module.exports.get = async (req, res) => {

  	let limit = 100;
  	if (!!req.body.limit) {
  		limit = req.body.limit;
  	}

  	if (!req.body.recipient || !req.body.start) {
  		res.status(400).send({message: "Failed! Missing required parameters!"});
		return;
  	}

	const messages = await messageService.getMessageByRecipient(
		req.body.recipient,
		req.body.start,
		limit
	);
  	res.status(200).json({ messages : [ messages ] });
};
