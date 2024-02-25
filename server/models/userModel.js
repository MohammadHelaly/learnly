const mongoose = require("mongoose");
// const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Course = require("./courseModel");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide a name."],
			maxLength: [40, "A username must be atmost 40 characters."],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please provide an email."],
			unique: true,
			lowercase: true,
			trim: true,
			validator: [validator.isEmail, "Please provide a valid email."],
		},
		photo: {
			type: String,
			default: "default.jpg",
		},
		bio: {
			type: String,
			maxLength: [1500, "A bio must be atmost 1500 characters."],
		},
		password: {
			type: String,
			required: [true, "Please provide a password."],
			minLength: [8, "Your password must be atleast 8 characters."],
			select: false,
		},
		passwordChangedAt: { type: Date, select: false },
		passwordResetToken: String,
		passwordResetExpires: Date,
		passwordConfirm: {
			type: String,
			required: [true, "Please confirm your password"],
			// This only works on CREATE and SAVE, NOT on UPDATE
			validate: {
				validator: function (el) {
					return el === this.password;
				},
			},
			message: "Password confirm is not the same as password.",
		},
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
		// stripeAccountId: "",
		// stripeSeller: {},
		// stripeSession: {},
		wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Course" }],
		coursesEnrolled: [{ type: mongoose.Schema.ObjectId, ref: "Course" }],
		coursesCreated: [{ type: mongoose.Schema.ObjectId, ref: "Course" }],
		// purchases: [{
		// 	course: { type: mongoose.Schema.ObjectId, ref: "Course" },
		// 	amount: Number,
		// 	createdAt: {
		// 		type: Date,
		// 		default: Date.now(),
		// 	},
		// }]
		// ,
		role: {
			type: String,
			enum: ["user", "instructor", "admin"],
			default: "user",
		},
		roleChangedAt: {
			type: Date,
			select: false,
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, "Average rating must be atleast 1.0."],
			max: [5, "Average rating must be atmost 5.0."],
			set: (value) => Math.round(value * 10) / 10,
		},
		ratingsQuantity: { type: Number, default: 0 },
		students: {
			type: Number,
			default: 0,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.pre("save", async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified("password")) return next();

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.pre(/^find/, function (next) {
	// This points to the current query
	this.find({ active: { $ne: false } });
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	// If passwordChangedAt field exists, then compare the time
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		// True means changed
		return JWTTimestamp < changedTimestamp;
	}
	// False means NOT changed
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	console.log({ resetToken }, this.passwordResetToken);

	return resetToken;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
