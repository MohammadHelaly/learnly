const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const handlerFactory = require("./handlerFactory");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

exports.setCourseUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.course) req.body.course = req.params.courseId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.protectReview = async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (review.user.id !== req.user.id && req.user.role !== "admin") {
    return next(
      new AppError("You are not authorized to perform this action.", 403)
    );
  }
  next();
};

//TODO: check if user is enrolled in course before creating review

exports.checkEnrollment = catchAsync(async (req, res, next) => {
  const courseId = req.body.course;
  const userId = req.user.id;
  const enrolledCourse = await Course.findOne({
    _id: courseId,
    students: userId,
  });
  if (!enrolledCourse) {
    return next(new AppError("You are not enrolled in this course.", 403));
  }
  next();
});

exports.getAllReviews = handlerFactory.getAll(Review);

exports.getReview = handlerFactory.getOne(Review);

exports.createReview = handlerFactory.createOne(Review);

exports.updateReview = handlerFactory.updateOne(Review);

exports.deleteReview = handlerFactory.deleteOne(Review);
