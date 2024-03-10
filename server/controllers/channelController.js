const Channel = require("../models/channelModel");
const handlerFactory = require("./handlerFactory");

exports.setCourseUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.course) req.body.course = req.params.courseId;
	if (!req.body.admins) req.body.admins = [req.user.id];
	next();
};

exports.getAllChannels = handlerFactory.getAll(Channel);

exports.getChannel = handlerFactory.getOne(Channel, { path: "messages" });

exports.createChannel = handlerFactory.createOne(Channel);

exports.updateChannel = handlerFactory.updateOne(Channel);

exports.deleteChannel = handlerFactory.deleteOne(Channel);
