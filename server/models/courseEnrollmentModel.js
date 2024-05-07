const mongoose = require("mongoose");

const User = require("./userModel");
const Course = require("./courseModel");
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

// courseEnrollmentSchema.pre(/^find/, function (next) {
// 	this.populate({
// 		path: "user",
// 		select: "-__v",
// 	});
// 	next();
// });

courseEnrollmentSchema.pre(/^find/, function (next) {
	this.populate({
		path: "course",
		select: "-__v",
	});
	next();
});

// Middleware:
// - with every enrollment number of course students should increase

courseEnrollmentSchema.post("save", async function (req, next) {
	try {
		const courseId = req.course;
		console.log(courseId);
		if (courseId) {
			const enrollmentCount = await CourseEnrollment.countDocuments({
				course: courseId,
			});

			await Course.findByIdAndUpdate(
				courseId,
				{
					students: enrollmentCount,
				},
				{ new: true }
			);
		}
		next();
	} catch (error) {
		next(error);
	}
});

// - ⁠with every enrollment number of students of every course instructor should increase
courseEnrollmentSchema.post("save", async function (req, next) {
	try {
		const courseId = req.course;
		if (courseId) {
			const course = await Course.findById(courseId);
			if (course) {
				for (const instructorId of course.instructors) {
					const instructor = await User.findByIdAndUpdate(
						instructorId,
						{
							$inc: { students: 1 },
						},
						{ new: true }
					);
				}
			}
		}

		next();
	} catch (error) {
		next(error);
	}
});

const CourseEnrollment = mongoose.model(
	"CourseEnrollment",
	courseEnrollmentSchema
);

module.exports = CourseEnrollment;
