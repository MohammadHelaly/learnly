const mongoose = require("mongoose");
const Course = require("./courseModel");
const User = require("./userModel");

const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			required: [true, "A review can not be empty."],
			trim: true,
			maxlength: [300, "A review must be atmost 300 characters."],
			minlength: [5, "A review must be atleast 5 characters."],
		},
		rating: {
			type: Number,
			min: [1, "A rating must be atleast 1.0."],
			max: [5, "A rating must be atmost 5.0."],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		course: {
			type: mongoose.Schema.ObjectId,
			ref: "Course",
			required: [true, "A review must belong to a course."],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "A review must belong to a user."],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

reviewSchema.index({ course: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "name photo",
	});
	next();
});

// Note: modify this to update instructor's ratingsAverage and ratingsQuantity as well
reviewSchema.statics.calculateAverageRatings = async function (courseId) {
	const stats = await this.aggregate([
		{
			$match: { course: courseId },
		},
		{
			$group: {
				_id: "$course",
				ratingsCount: { $sum: 1 },
				ratingsAverage: { $avg: "$rating" },
			},
		},
	]);

	if (stats.length > 0) {
		const course = await Course.findByIdAndUpdate(courseId, {
			ratingsQuantity: stats[0].ratingsCount,
			ratingsAverage: stats[0].ratingsAverage,
		});
	} else {
		const course = await Course.findByIdAndUpdate(courseId, {
			ratingsQuantity: 0,
			ratingsAverage: 4.5,
		});
	}
};

reviewSchema.post("save", function () {
	// this points to current review
	this.constructor.calculateAverageRatings(this.course);
});

// reviewSchema.pre(/^findOneAnd/, async function (next) {
// 	this.rev = await this.findOne();
// 	next();
// });

// reviewSchema.post(/^findOneAnd/, async function () {
// 	// await this.findOne(); does NOT work here, query has already executed
// 	await this.rev.constructor.calculateAverageRatings(this.rev.course);
// });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
