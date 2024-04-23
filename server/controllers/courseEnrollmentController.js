const CourseEnrollment = require("../models/courseEnrollmentModel");
const factory = require("./handlerFactory");
const Course = require("../models/courseModel");
exports.enrollUser = async (req, res) => {
	const user = req.body.user;
	const course = req.params.courseId;
	const courseObj = await Course.findById(course);
	if (!courseObj) {
		return res.status(404).json({
			status: "fail",
			message: "Course not found!",
		});
	}

	try {
		// const courseEnrollment = await CourseEnrollment.findOneAndUpdate(
		// 	{ user: user },
		// 	{ $push: { courses: course } },
		// 	{ new: true }
		// );

		const courseEnrollment = await CourseEnrollment.create({
			user: user,
			course: course,
			date: Date.now(),
		});

		res.status(201).json({
			status: "success",
			data: {
				courseEnrollment,
			},
		});
	} catch (err) {
		console.log(err);
	}
};

// exports.addCourseEnrollment = factory.createOne(CourseEnrollment);
exports.getAllCourseEnrollments = factory.getAll(CourseEnrollment);

// exports.getAllCourseEnrollments = async (req, res) => {
// 	const user = req.body.user;
// 	try {
// 		const courseEnrollment = await CourseEnrollment.findOne({ user: user });
// 		res.status(201).json({
// 			status: "success",
// 			data: {
// 				courseEnrollment,
// 			},
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
