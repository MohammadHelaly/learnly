const mongoose = require("mongoose");
const slugify = require("slugify");
// const Module = require("./moduleModel");

// const moduleSchema = new mongoose.Schema(
// 	{
// 		title: {
// 			type: String,
// 			trim: true,
// 			minlength: 3,
// 			maxlength: 320,
// 			required: true,
// 		},
// 		slug: {
// 			type: String,
// 			lowercase: true,
// 		},
// 		content: {
// 			type: {},
// 			minlength: 200,
// 		},
// 		video: {},
// 		free_preview: {
// 			type: Boolean,
// 			default: false,
// 		},
// 	},
// 	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
// );

const sectionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			minlength: 3,
			maxlength: 320,
			required: true,
		},
		// key: {
		// 	type: String,
		// 	required: true,
		// },
		description: {
			type: String,
			trim: true,
			minlength: 3,
			maxlength: 320,
		},
		slug: {
			type: String,
			lowercase: true,
		},
		modules: [
			{
				title: {
					type: String,
					trim: true,
					minlength: 3,
					maxlength: 320,
					required: true,
				},
				slug: {
					type: String,
					lowercase: true,
				},
				content: {
					type: {},
					minlength: 200,
				},
				url: {
					type: String,
				},
				free_preview: {
					type: Boolean,
					default: false,
				},
			},
		],
		//
		// modules: [moduleSchema],
		//
		// modules: [
		// 	{
		// 		type: mongoose.Schema.ObjectId,
		// 		ref: "Module",
		// 	},
		// ],
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// sectionSchema.virtual("modules", {
// 	ref: "Module",
// 	foreignField: "section",
// 	localField: "_id",
// });

sectionSchema.pre("save", function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
