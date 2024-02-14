const mongoose = require("mongoose");
const slugify = require("slugify");
const User = require("./userModel");
const Section = require("./sectionModel");
const Module = require("./moduleModel");
const Channel = require("./channelModel");

const courseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A course must have a name"],
			unique: true,
			trim: true,
			maxLength: [40, "A course name must be atmost 40 characters."],
		},
		slug: String,
		duration: {
			type: Number,
			// type: String,
			required: [true, "A course must have a duration"],
			min: [0.25, "A course duration must be atleast 0.25 hours."],
		},
		difficulty: {
			type: String,
			required: [true, "A course must have a difficulty"],
			enum: {
				values: ["beginner", "intermediate", "advanced"],
				message:
					"Difficulty is either: beginner, intermediate, or advanced",
			},
		},
		categories: {
			required: [true, "A course must have atleast one category"],
			type: [
				{
					type: String,
					required: [true, "A course must have atleast one category"],
					enum: [
						"web development",
						"mobile development",
						"game development",
						"machine learning",
						"artificial intelligence",
						"cybersecurity",
						"networking",
						"operating systems",
						"blockchain",
						"cloud computing",
						"quantum computing",
						"iot",
						"computer graphics",
						"computer vision",
						"robotics",
						"natural language processing",
						"big data",
						"database management",
						"data science",
						"computer architecture",
						"computer networks",
						"software engineering",
						"computer programming",
						"computer science",
						"miscellaneous",
					],
				},
			],
			validate: {
				validator: function (value) {
					return value.length <= 12;
				},
				message: "A course can have at most 12 categories.",
			},
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, "Average rating must be atleast 1.0."],
			max: [5, "Average rating must be atmost 5.0."],
			set: (value) => Math.round(value * 10) / 10,
		},
		ratingsQuantity: { type: Number, default: 0 },
		published: {
			type: Boolean,
			default: false,
		},
		paid: {
			type: Boolean,
			default: true,
		},
		price: {
			type: Number,
			required: [true, "A course must have a price"],
		},
		onSale: {
			type: Boolean,
			default: false,
		},
		priceDiscount: {
			type: Number,
			default: undefined,
			validate: {
				message:
					"Discount price ({VALUE}) should be below regular price",
				validator: function (val) {
					// this only points to current doc on NEW document creation (not on update)
					//so we need to use a hack to get around that (see updateTour in tourController.js)
					return val < this.price;
				},
			},
		},
		summary: {
			type: String,
			trim: true,
			required: [true, "A course must have a summary"],
			maxLength: [128, "A course summary must be atmost 128 characters."],
		},
		description: {
			type: String,
			trim: true,
			required: [true, "A course must have a description"],
			maxLength: [
				5000,
				"A course description must be atmost 5000 characters.",
			],
		},
		prerequisites: {
			type: [
				{
					type: String,
					maxLength: [
						128,
						"A prerequisite must be 128 characters or less.",
					],
				},
			],
			validate:
				// [
				{
					validator: function (value) {
						return value.length <= 12;
					},
					message: "A course can have at most 12 prerequisites.",
				},
			// ],
		},
		skills: {
			required: [true, "A course must teach atleast one skill"],
			type: [
				{
					type: String,
					maxLength: [128, "A skill must be 128 characters or less."],
					required: [true, "A course must teach atleast one skill"],
				},
			],
			validate:
				// [
				{
					validator: function (value) {
						return value.length <= 12;
					},
					message: "A course can have at most 12 skills.",
				},
			// ],
		},
		imageCover: {
			type: String,
			required: [true, "A course must have a cover image"],
		},
		images: [String],
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		instructors: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
		students: {
			type: Number,
			default: 0,
		},
		sections: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "Section",
			},
		],
		// modules: [
		// 	{
		// 		type: mongoose.Schema.ObjectId,
		// 		ref: "Module",
		// 	},
		// ],
		channel: {
			type: mongoose.Schema.ObjectId,
			ref: "Channel",
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

courseSchema.index({ price: 1, ratingsAverage: -1 });
courseSchema.index({ slug: 1 });

// Virtual populate
courseSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "course",
	localField: "_id",
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create() but not .insertMany() or .update(), etc
courseSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

// QUERY MIDDLEWARE: runs before .find() and .findOne() but not .findById(), etc
courseSchema.pre(/^find/, function (next) {
	this.populate({
		path: "instructors",
		select: "-__v -passwordChangedAt",
	});
	next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;