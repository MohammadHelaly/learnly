const mongoose = require("mongoose");
const Course = require("./courseModel");
const Message = require("./messageModel");

const channelSchema = mongoose.Schema(
	{
		name: { type: String, trim: true },
		course: {
			type: mongoose.Schema.ObjectId,
			ref: "Course",
		},
		isCourseChannel: { type: Boolean, default: true, required: true },
		users: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
		latestMessage: {
			type: mongoose.Schema.ObjectId,
			ref: "Message",
		},
		admins: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Virtual populate
channelSchema.virtual("messages", {
	ref: "Message",
	foreignField: "channel",
	localField: "_id",
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create() but not .insertMany() or .update(), etc
channelSchema.pre("save", async function (next) {
	if (this.isNew) {
		if (!this.isCourseChannel) {
			return next();
		}

		const courseId = this.course;

		const existingChannel = await Channel.findOne({ course: courseId });

		if (existingChannel) {
			throw new Error(
				`Channel for course with id ${courseId} already exists.`
			);
		}

		try {
			const course = await Course.findByIdAndUpdate(
				courseId,
				{ $set: { channel: this._id } },
				{ new: true }
			);

			if (!course) {
				throw new Error(`Course with id ${courseId} not found.`);
			}

			this.name = course.name;
			this.admins = course.instructors;
			this.users = course.instructors; // TODO: check if this is the right approach
		} catch (error) {
			console.error(
				`Error occurred while updating course with id ${courseId}.`
			);

			return next(error);
		}
	}
	next();
});

// pre delete middleware is not working, need to fix it
channelSchema.pre(/^delete/, async function (next) {
	if (!this.isCourseChannel) {
		return next();
	}

	const courseId = this.course;

	try {
		const course = await Course.findByIdAndUpdate(
			courseId,
			{
				$unset: { channel: "" },
			},
			{ new: true }
		);

		if (!course) {
			throw new Error(`Course with id ${courseId} not found.`);
		}
	} catch (error) {
		console.error(
			`Error occurred while updating course with id ${courseId}.`
		);

		return next(error);
	}
	next();
});

channelSchema.pre(/^delete/, async function (next) {
	const channelId = this._id;

	try {
		const messages = await Message.deleteMany({ channel: channelId });

		if (!messages) {
			throw new Error(
				`Messages for channel with id ${channelId} not found.`
			);
		}

		console.log(`Messages for channel with id ${channelId} deleted.`);
	} catch (error) {
		console.error(
			`Error occurred while deleting messages for channel with id ${channelId}.`
		);

		return next(error);
	}
	next();
});

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
