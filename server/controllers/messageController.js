const Message = require("../models/messageModel");
const handlerFactory = require("./handlerFactory");
const Enrollment = require("../models/enrollmentModel");
const Channel = require("../models/channelModel");
const AppError = require("../utils/appError");

exports.setChannelUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.channel) req.body.channel = req.params.channelId;
	if (!req.body.sender) req.body.sender = req.user.id;
	req.body.course = req.params.courseId = undefined;
	next();
};

exports.protectChannel = async (req, res, next) => {
	const channel = await Channel.findById(req.body.channel);

	if (!channel) {
		return res.status(404).json({
			message: "Channel not found",
		});
	}
	if (channel.admins.includes(req.user.id) || req.user.role === "admin") {
		return next();
	}

	const courseId = channel.course;
	const enrollments = await Enrollment.find({ course: courseId });
	const users = enrollments.map((enrollment) => enrollment.user.toString());

	if (!users.includes(req.user.id)) {
		return res.status(403).json({
			message: "You are not authorized to perform this action.",
		});
	}

	next();
};

exports.protectMessage = async (req, res, next) => {
	// Allow nested routes
	if (req.user.role === "admin") {
		next();
	}
	const message = await Message.findById(req.params.id);

	if (message.sender.id !== req.user.id) {
		next(
			new AppError("You are not authorized to perform this action.", 403)
		);
	}

	next();
};

exports.getAllMessages = handlerFactory.getAll(Message);

exports.getMessage = handlerFactory.getOne(Message);

exports.createMessage = handlerFactory.createOne(Message);

exports.updateMessage = handlerFactory.updateOne(Message);

exports.deleteMessage = handlerFactory.deleteOne(Message);
