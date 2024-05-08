const Enrollment = require("../models/enrollmentModel");
const handlerFactory = require("./handlerFactory");
const Course = require("../models/courseModel");

exports.setCourseUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.course) req.body.course = req.params.courseId;
	if (!req.body.user) req.body.user = req.user.id;
	next();
};

// exports.createEnrollment = factory.createOne(Enrollment);
exports.enrollUser = async (req, res) => {
	const user = req.body.user;
	const course = req.body.course;
	const courseObj = await Course.findById(course);
	if (!courseObj) {
		return res.status(404).json({
			status: "fail",
			message: "Course not found!",
		});
	}

	try {
		// const courseEnrollment = await Enrollment.findOneAndUpdate(
		// 	{ user: user },
		// 	{ $push: { courses: course } },
		// 	{ new: true }
		// );

		const courseEnrollment = await Enrollment.create({
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

exports.getAllEnrollments = handlerFactory.getAll(Enrollment);

exports.getEnrollment = handlerFactory.getOne(Enrollment);

exports.createEnrollment = handlerFactory.createOne(Enrollment);

exports.updateEnrollment = handlerFactory.updateOne(Enrollment);

exports.deleteEnrollment = handlerFactory.deleteOne(Enrollment);
