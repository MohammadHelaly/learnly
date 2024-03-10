const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		// To allow for nested GET requests (hack)
		let auxFilter = {};
		if (req.params.courseId) auxFilter = { course: req.params.courseId };
		if (req.params.channelId) auxFilter = { channel: req.params.channelId };

		const features = new APIFeatures(Model.find(auxFilter), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const allDocuments = await features.query;

		res.status(200).json({
			status: "success",
			results: allDocuments.length,
			data: { data: allDocuments },
		});
	});

exports.getOne = (Model, populateOptions) =>
	catchAsync(async (req, res, next) => {
		let query = Model.findById(req.params.id);
		if (populateOptions) query = query.populate(populateOptions);

		const features = new APIFeatures(query, req.query).limitFields();
		const document = await features.query;

		if (!document)
			return next(
				new AppError.default("No document found with that ID", 404)
			);

		res.status(200).json({
			status: "success",
			data: { data: document },
		});
	});

exports.createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const document = await Model.create(req.body);
		res.status(201).json({
			status: "success",
			data: { data: document },
		});
	});

exports.updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const document = await Model.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!document)
			return next(
				new AppError.default("No document found with that ID", 404)
			);
		res.status(200).json({
			status: "success",
			data: { data: document },
		});
	});

exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const document = await Model.findByIdAndDelete(req.params.id);
		if (!document)
			return next(
				new AppError.default("No document found with that ID", 404)
			);
		res.status(204).json({
			status: "success",
			data: null,
		});
	});
