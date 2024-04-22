const mongoose = require("mongoose");
const Course = require("./courseModel");
const User = require("./userModel");
const catchAsync = require("../utils/catchAsync");

const courseEnrollmentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: [true, "A course enrollment must belong to a user"],
	},
	course: {
		type: mongoose.Schema.ObjectId,
		ref: "Course",
		required: [true, "A user enrollment must belong to a course"],
	},
	dateCreated: {
		type: Date,
		default: Date.now(),
	},
});

courseEnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const CourseEnrollment = mongoose.model(
	"CourseEnrollment",
	courseEnrollmentSchema
);

module.exports = CourseEnrollment;
