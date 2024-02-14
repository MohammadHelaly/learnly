const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const handlerFactory = require("./handlerFactory");

exports.setCourseUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.course) req.body.course = req.params.courseId;
	if (!req.body.user) req.body.user = req.user.id;
	next();
};

exports.getAllReviews = handlerFactory.getAll(Review);

exports.getReview = handlerFactory.getOne(Review);

exports.createReview = handlerFactory.createOne(Review);

exports.updateReview = handlerFactory.updateOne(Review);

exports.deleteReview = handlerFactory.deleteOne(Review);
