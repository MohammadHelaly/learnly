const Message = require("../models/messageModel");
const handlerFactory = require("./handlerFactory");
const courseEnrollment = require("../models/courseEnrollmentModel");
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
		return new AppError("Channel not found.", 404);
	}

	if (channel.admins.includes(req.user.id) || req.user.role === "admin") {
		next();
	}

	const courseId = channel.course;
	const enrollments = await courseEnrollment.find({ course: courseId });
	const users = enrollments.map((enrollment) => enrollment.user.toString());

	if (!users.includes(req.user.id)) {
		return new AppError(
			"You are not authorized to perform this action.",
			403
		);
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
		return new AppError(
			"You are not authorized to perform this action.",
			403
		);
	}

	next();
};

exports.getAllMessages = handlerFactory.getAll(Message);

exports.getMessage = handlerFactory.getOne(Message);

exports.createMessage = handlerFactory.createOne(Message);

exports.updateMessage = handlerFactory.updateOne(Message);

exports.deleteMessage = handlerFactory.deleteOne(Message);
