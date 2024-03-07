const Course = require("../models/courseModel");
const Section = require("../models/sectionModel");
const Error = require("../utils/appError");
const courseController = require("./courseController");
exports.addSection = async (req, res) => {
	const { courseId } = req.params;
	const { title, description } = req.body;
	sectionCreated = await Section.create({
		title,
		description,
		//course: courseId,
	});

	try {
		const course = await Course.findByIdAndUpdate(
			courseId,
			{ $push: { sections: sectionCreated._id } },
			{ new: true }
		);

		if (!course) {
			throw new Error(`Course with id ${courseId} not found.`);
		}
	} catch (error) {
		console.error(
			`Error updating coursesCreated for section ${course}: ${error}`
		);
	}
	res.status(201).json({
		status: "success",
		data: {
			sectionCreated,
		},
	});
};
exports.addModule = async (req, res) => {
	const upload = courseController.uploadCourseVideo(req, res);
	const { sectionId, title, url } = req.body;
	const moduleCreated = {
		title,
		url,
	};

	try {
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ $push: { modules: moduleCreated } },
			{ new: true }
		);

		if (!section) {
			throw new Error(`Section with id ${sectionId} not found.`);
		} else {
			res.status(201).json({
				status: "success",
				data: {
					section,
				},
			});
		}
	} catch (error) {
		console.error(
			`Error updating modulesCreated for section ${section}: ${error}`
		);
	}
};
