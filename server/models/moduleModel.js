// const mongoose = require("mongoose");
// const slugify = require("slugify");
// // const Section = require("./sectionModel");

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
// 		// section: { type: mongoose.Schema.ObjectId, ref: "Section" },
// 	},
// 	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
// );

// const Module = mongoose.model("Module", moduleSchema);

// module.exports = Module;
