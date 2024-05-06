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

// reviewSchema.statics.calculateAverageRatingsForInstructors = async function () {
//   try {
//     const courses = await Course.find({ instructors: instructorId });
//     if (courses.length === 0) {
//       return 0;
//     }
//     let totalRatingSum = 0;
//     let totalRatingCount = 0;
//     for (const course of courses) {
//       totalRatingSum += course.ratingsAverage * course.ratingsQuantity;
//       totalRatingCount += course.ratingsQuantity;
//     }
//     const instructorAverageRating = totalRatingSum / totalRatingCount;
//     return Math.round(instructorAverageRating * 10) / 10;
//   } catch (error) {
//     console.error("Error calculating average rating of instructor:", error);
//     return 0;
//   }
// };

reviewSchema.pre("save", async function (next) {
  if (!this.isModified("rating")) return next();
  try {
    const courseId = this.course;
    //const instructorId = this.course.instructor;
    await this.constructor.calculateAverageRatings(courseId);
    //await this.constructor.calculateAverageRatingsForInstructor(instructorId);
    next();
  } catch (err) {
    next(err);
  }
  next();
});

reviewSchema.pre("remove", async function (next) {
  try {
    const courseId = this.course;
    //const instructorId = this.course.instructor;
    await this.constructor.calculateAverageRatings(courseId);
    // await this.constructor.calculateAverageRatingsForInstructor(instructorId);
    next();
  } catch (err) {
    next(err);
  }
  next();
});
reviewSchema.post(/^findOneAnd/, async function (doc, next) {
  if (doc) {
    const courseId = doc.course;
    //const instructorId = doc.course.instructor;
    await doc.constructor.calculateAverageRatings(courseId);
    //await doc.constructor.calculateAverageRatingsForInstructor(instructorId);
  }
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
