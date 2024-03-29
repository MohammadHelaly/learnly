const Course = require("../models/courseModel");
const Section = require("../models/sectionModel");
const Error = require("../utils/appError");
const handlerFactory = require("./handlerFactory");
const CatchAsync = require("../utils/catchAsync");
const AWS = require("aws-sdk");
const uuid = require("uuid").v4;
const fs = require("fs");

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

exports.getAllSections = handlerFactory.getAll(Section);

exports.getSection = handlerFactory.getOne(Section);

exports.updateSection = handlerFactory.updateOne(Section);

exports.deleteSection = handlerFactory.deleteOne(Section);

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
			{ $set: { [`modules.${moduleNumber}.video`]: video } },
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

exports.deleteModuleVideo = (req, res) => {
	try {
		const key = req.body.key;
		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: key,
		};

		S3.deleteObject(params, (err, data) => {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			}
			res.send({ ok: true });
		});
	} catch (err) {
		console.log(err);
	}

	// s3 delete
};

exports.getAllSections = handlerFactory.getAll(Section);
