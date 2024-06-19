// const mongoose = require("mongoose");
// const Course = require("./courseModel");
// const User = require("./userModel");

// const purchaseSchema = new mongoose.Schema(
// 	{
// 		user: {
// 			type: mongoose.Schema.ObjectId,
// 			ref: "User",
// 			required: [true, "A booking must belong to a user!"],
// 		},
// 		transactionID: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 		},
// 		amount: {
// 			type: Number,
// 			required: true,
// 		},
// 		currency: {
// 			type: String,
// 			required: true,
// 		},
// 		status: {
// 			type: String,
// 			enum: ["Pending", "Completed", "Refunded"],
// 			default: "Pending",
// 		},
// 		course: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "Course",
// 			required: true,
// 		},
// 		// courses: [
// 		// 	{
// 		// 		type: mongoose.Schema.Types.ObjectId,
// 		// 		ref: "Course",
// 		// 		required: true,
// 		// 	},
// 		// ],
// 		refund: {
// 			transactionID: String,
// 			refundedAt: Date,
// 		},
// 		createdAt: {
// 			type: Date,
// 			default: Date.now,
// 		},
// 	},
// 	{
// 		toJSON: { virtuals: true },
// 		toObject: { virtuals: true },
// 	}
// );

// purchaseSchema.pre(/^find/, function (next) {
// 	this.populate("user").populate({
// 		path: "course",
// 		select: "name",
// 	});
// 	next();
// });

// const Purchase = mongoose.model("Purchase", purchaseSchema);

// module.exports = Purchase;
