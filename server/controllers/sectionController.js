const Course = require("../models/courseModel");
const Section = require("../models/sectionModel");
const Error = require("../utils/appError");
const handlerFactory = require("./handlerFactory");
const CatchAsync = require("../utils/catchAsync");

exports.setCourseUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.course) req.body.course = req.params.courseId;
	if (!req.body.user) req.body.user = req.user.id;
	next();
};

exports.createSection = CatchAsync(async (req, res, next) => {
	const { courseId } = req.params;
	const { title, description } = req.body;

	const newSection = await Section.create({
		title,
		description,
	});

	const course = await Course.findByIdAndUpdate(
		courseId,
		{ $push: { sections: newSection._id } },
		{ new: true }
	);

	if (!course) {
		throw new Error(`Course with id ${courseId} not found.`);
	}

	res.status(201).json({
		status: "success",
		data: {
			sectionCreated: newSection,
		},
	});
});
// exports.createSection = handlerFactory.createOne(Section);

exports.getAllSections = handlerFactory.getAll(Section);

exports.getSection = handlerFactory.getOne(Section);

exports.updateSection = handlerFactory.updateOne(Section);

exports.deleteSection = handlerFactory.deleteOne(Section);

exports.addModule = async (req, res) => {
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
exports.getAllSections = handlerFactory.getAll(Section);
