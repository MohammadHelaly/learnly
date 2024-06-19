const mongoose = require("mongoose");

const User = require("./userModel");
const Course = require("./courseModel");
const catchAsync = require("../utils/catchAsync");

const enrollmentSchema = new mongoose.Schema({
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

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// enrollmentSchema.pre(/^find/, function (next) {
// 	this.populate({
// 		path: "user",
// 		select: "-__v",
// 	});
// 	next();
// });

enrollmentSchema.pre(/^find/, function (next) {
	this.populate({
		path: "course",
		select: "-__v",
	});
	next();
});

// With every enrollment number of course students should increase
enrollmentSchema.post("save", async function (req, next) {
	try {
		const courseId = req.course;
		console.log(courseId);
		if (courseId) {
			const enrollmentCount = await Enrollment.countDocuments({
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

// ⁠With every enrollment number of students of every course instructor should increase
enrollmentSchema.post("save", async function (req, next) {
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

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
