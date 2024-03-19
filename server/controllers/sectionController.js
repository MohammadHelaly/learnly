const Course = require("../models/courseModel");
const Section = require("../models/sectionModel");
const Error = require("../utils/appError");
const handlerFactory = require("./handlerFactory");
const CatchAsync = require("../utils/catchAsync");
const AWS = require("aws-sdk");
const uuid = require("uuid").v4;
const fs = require("fs");
const { getVideoDurationInSeconds } = require("get-video-duration");

const awsConfig = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
};
const S3 = new AWS.S3(awsConfig);

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

exports.addModule = async (req, res) => {
	const sectionId = req.params.id;
	const { title } = req.body;
	console.log(req.body);
	const moduleCreated = {
		title,
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
					section: section,
				},
			});
		}
	} catch (error) {
		console.error(
			`Error updating modulesCreated for section ${sectionId}: ${error}`
		);
	}
};

exports.uploadModuleVideo = async (req, res) => {
	try {
		const { id, moduleNumber } = req.params;
		const { files } = req;

		const receivedVideo = files.video;
		if (!receivedVideo) return res.status(400).send("No video received");

		const duration = await getVideoDurationInSeconds(receivedVideo.path);

		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: `${uuid()}.${receivedVideo.type.split("/")[1]}`,
			Body: fs.readFileSync(receivedVideo.path),
			ACL: "public-read",
			ContentType: `${receivedVideo.type}`,
		};

		console.log("Uploading to S3");

		//upload to S3
		const stored = await S3.upload(params).promise();

		console.log("Uploaded to S3");

		const video = {
			url: stored.Location,
			key: stored.Key,
		};

		const section = await Section.findByIdAndUpdate(
			id,
			{
				$set: {
					[`modules.${moduleNumber}.video`]: video,
					[`modules.${moduleNumber}.duration`]: duration,
				},
			},
			{ new: true }
		);

		if (!section) {
			throw new Error(`Section with id ${id} not found.`);
		} else {
			res.status(201).json({
				status: "success",
				data: {
					section: section,
				},
			});
		}
	} catch (err) {
		console.log(err);
	}
};

exports.getVideoKey = async (req, res, next) => {
	const { id, moduleNumber } = req.params;
	console.log(req.params);
	const section = await Section.findById(id);

	if (!section) {
		throw new Error(`Section with id ${id} not found.`);
	}

	const videoKey = section.modules[moduleNumber].video.key;

	req.body = section;
	next();
};

exports.deleteModuleVideoAndUpdateSection = (req, res, next) => {
	try {
		const key = req.body.modules[req.params.moduleNumber].video.key;
		req.body.modules[req.params.moduleNumber].video = undefined;
		req.body.modules[req.params.moduleNumber].duration = undefined;
		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: key,
		};
		console.log("Deleting from S3");
		S3.deleteObject(params, (err) => {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			}
			next();
		});
	} catch (err) {
		console.log(err);
	}

	// s3 delete
};

exports.deleteModuleVideo = (req, res) => {
	try {
		const key = req.body.modules[req.params.moduleNumber].video.key;
		req.body.modules[req.params.moduleNumber].video = undefined;
		req.body.modules[req.params.moduleNumber].duration = undefined;
		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: key,
		};
		console.log("Deleting from S3");
		S3.deleteObject(params, (err) => {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			}
			res.sendStatus(200);
		});
	} catch (err) {
		console.log(err);
	}

	// s3 delete
};

// Assuming you have a Section model imported

//Delete Section

exports.deleteSection = async (req, res) => {
	const sectionId = req.params.id;

	try {
		const sectionToDelete = await Section.findByIdAndDelete(sectionId);

		if (!sectionToDelete) {
			throw new Error(`Section with id ${sectionId} not found.`);
		} else {
			res.status(200).json({
				status: "success",
				message: `Section with id ${sectionId} has been deleted.`,
			});
		}
	} catch (error) {
		console.error(`Error deleting section ${sectionId}: ${error}`);
		res.status(500).json({
			status: "error",
			message: "Internal server error.",
		});
	}
};

//DELETE MODULE
exports.deleteModule = async (req, res, next) => {
	const sectionId = req.params.id;
	const module = req.params.moduleNumber;

	try {
		// const section = await Section.findByIdAndUpdate(
		// 	sectionId,
		// 	{ $pull: { modules: { _id: module } } },
		// 	{ new: true }
		// );
		const section = await Section.findById(sectionId);

		//const module = req.params
		//   try {
		//     const section = await Section.findByIdAndDelete(sectionId,
		//       { $pull: { modules: { _id: module } } },
		//       { new: true }
		//       );

		if (!section) {
			throw new Error(`Section with id ${sectionId} not found.`);
		} else {
			section.modules.splice(module, 1);
			req.body = section;
			next();
		}
	} catch (error) {
		console.error(
			`Error deleting module from section ${sectionId}: ${error}`
		);
	}
};

exports.getAllSections = handlerFactory.getAll(Section);

exports.getSection = handlerFactory.getOne(Section);

exports.updateSection = handlerFactory.updateOne(Section);

// exports.deleteSection = handlerFactory.deleteOne(Section);
