const Course = require("../models/courseModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");
const multer = require("multer");
// const sharp = require("sharp");

// Multer configuration
// const multerStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "public/img/users");
// 	},
// 	filename: (req, file, cb) => {
// 		// user-123abc123abc123abc-1234567890.jpeg
// 		const ext = file.mimetype.split("/")[1];
// 		cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
// 	},
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new Error("Not an image! Please upload only images."), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.resizeCourseImages = catchAsync(async (req, res, next) => {
	if (!req.files.images && !req.files.imageCover) return next();

	// 1) Cover image
	req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;

	// await sharp(req.files.imageCover[0].buffer)
	// 	.resize(2000, 1333)
	// 	.toFormat("jpeg")
	// 	.jpeg({ quality: 90 })
	// 	.toFile(`public/img/tours/${req.body.imageCover}`);

	// 2) Images
	req.body.images = [];

	await Promise.all(
		req.files.images.map(async (file, i) => {
			const filename = `tour-${req.params.id}-${Date.now()}-${
				i + 1
			}.jpeg`;

			// await sharp(file.buffer)
			// 	.resize(2000, 1333)
			// 	.toFormat("jpeg")
			// 	.jpeg({ quality: 90 })
			// 	.toFile(`public/img/tours/${filename}`);

			req.body.images.push(filename);
		})
	);

	next();
});

exports.uploadCourseImages = upload.fields([
	{ name: "imageCover", maxCount: 1 },
	{ name: "images", maxCount: 3 },
]);

exports.aliasTop5CheapestCourses = (req, res, next) => {
	req.query.limit = "5";
	req.query.sort = "price";
	req.query.fields = "name,price,duration,difficulty";
	next();
};

exports.getAllCourses = handlerFactory.getAll(Course);

exports.getCourse = handlerFactory.getOne(Course, { path: "reviews" });

exports.createCourse = handlerFactory.createOne(Course);

exports.updateCourse = handlerFactory.updateOne(Course);

exports.deleteCourse = handlerFactory.deleteOne(Course);

// exports.getCourseStats = catchAsync(async (req, res, next) => {
// 	const stats = await Course.aggregate([
// 		{ $match: { ratingsAverage: { $gte: 4.5 } } },
// 		{
// 			$group: {
// 				_id: "$difficulty",
// 				numTours: { $sum: 1 },
// 				numRatings: { $sum: "$ratingsQuantity" },
// 				avgRating: { $avg: "$ratingsAverage" },
// 				avgPrice: { $avg: "$price" },
// 				minPrice: { $min: "$price" },
// 				maxPrice: { $max: "$price" },
// 			},
// 		},
// 		{ $sort: { avgPrice: 1 } },
// 		// {$match:{_id:{$ne:'easy'}}}
// 	]);
// 	res.status(200).json({
// 		status: "success",
// 		data: { stats },
// 	});
// });

// exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
// 	const year = req.params.year * 1;
// 	const plan = await Course.aggregate([
// 		{ $unwind: "$startDates" },
// 		{
// 			$match: {
// 				startDates: {
// 					$gte: new Date(`${year}-01-01`),
// 					$lte: new Date(`${year}-12-31`),
// 				},
// 			},
// 		},
// 		{
// 			$group: {
// 				_id: { $month: "$startDates" },
// 				numTourStarts: { $sum: 1 },
// 				tours: { $push: "$name" },
// 			},
// 		},
// 		{ $addFields: { month: "$_id" } },
// 		{ $project: { _id: 0 } },
// 		{ $sort: { numTourStarts: -1 } },
// 		{ $limit: 12 },
// 	]);
// 	res.status(200).json({
// 		status: "success",
// 		data: { plan },
// 	});
// });
