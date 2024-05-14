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

// TODO: Refactor this implementation
reviewSchema.statics.calculateAverageRatings = async function (courseId, doc) {
	let stats;
	if (doc) {
		const reviews = await Review.find({ course: courseId });

		// Initialize variables to hold the count and sum of ratings
		let ratingsCount = 0;
		let ratingsSum = 0;

		// Iterate over the reviews
		for (const review of reviews) {
			// Increment the count of ratings
			ratingsCount++;

			// Add the rating to the sum
			ratingsSum += review.rating;
		}

		// Calculate the average rating
		let ratingsAverage = 0;
		if (ratingsCount > 0) {
			ratingsAverage = ratingsSum / ratingsCount;
		}

		// Return or log the results
		stats = [
			{
				course: courseId,
				ratingsCount,
				ratingsAverage,
			},
		];
	} else {
		stats = await this.aggregate([
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
	}

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

reviewSchema.statics.calculateAverageRatingsForInstructors = async function (
	instructorId
) {
	try {
		const courses = await Course.find({ instructors: [instructorId] });

		if (courses.length === 0) {
			const instructor = await User.findByIdAndUpdate(instructorId, {
				ratingsAverage: 0,
				ratingsQuantity: 0,
			});
			return 0;
		}

		let totalRatingSum = 0;
		let totalRatingCount = 0;

		for (const course of courses) {
			courseRatingSum = 0;
			courseRatingCount = 0;
			const courseId = course.id;
			const courseReviews = await Review.find({ course: courseId });
			for (const review of courseReviews) {
				courseRatingSum += review.rating;
				courseRatingCount++;
			}
			totalRatingSum += courseRatingSum;
			totalRatingCount += courseRatingCount;
		}

		if (totalRatingCount !== 0) {
			const instructorAverageRating = totalRatingSum / totalRatingCount;
			const instructor = await User.findByIdAndUpdate(instructorId, {
				ratingsAverage: instructorAverageRating,
				ratingsQuantity: totalRatingCount,
			});
		} else {
			const instructor = await User.findByIdAndUpdate(instructorId, {
				ratingsAverage: 0,
				ratingsQuantity: 0,
			});
		}
	} catch (error) {
		console.error("Error calculating average rating of instructor:", error);
		return 0;
	}
};

reviewSchema.post("save", async function (next) {
	// if (!this.isModified("rating")) return next();
	try {
		const course = await Course.findById(this.course);
		await this.constructor.calculateAverageRatings(this.course, null);

		await this.constructor.calculateAverageRatingsForInstructors(
			course.instructors[0].id
		);
	} catch (err) {
		console.error(err);
	}
});

reviewSchema.post(/^findOneAnd/, async function (doc, next) {
	if (doc) {
		const courseId = doc.course.toString();

		const course = await Course.findById(courseId);

		reviewSchema.statics.calculateAverageRatings(courseId, doc);
		reviewSchema.statics.calculateAverageRatingsForInstructors(
			course.instructors[0].id
		);
	}
	next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
