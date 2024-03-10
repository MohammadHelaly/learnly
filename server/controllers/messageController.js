const Message = require("../models/messageModel");
const handlerFactory = require("./handlerFactory");

exports.setChannelUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.channel) req.body.channel = req.params.channelId;
	if (!req.body.sender) req.body.sender = req.user.id;
	req.body.course = req.params.courseId = undefined;
	next();
};

exports.getAllMessages = handlerFactory.getAll(Message);

exports.getMessage = handlerFactory.getOne(Message);

exports.createMessage = handlerFactory.createOne(Message);

exports.updateMessage = handlerFactory.updateOne(Message);

exports.deleteMessage = handlerFactory.deleteOne(Message);
