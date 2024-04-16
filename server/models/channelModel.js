const mongoose = require("mongoose");
const Course = require("./courseModel");
const Message = require("./messageModel");
const slugify = require("slugify");

const channelSchema = mongoose.Schema(
	{
		name: { type: String, trim: true },
		slug: {
			type: String,
			unique: [true, "A channel with this slug already exists."],
		},
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
channelSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

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

channelSchema.pre("findOneAndDelete", async function (next) {
	const channelId = this._conditions._id;

	try {
		const messages = await Message.deleteMany({ channel: channelId });

		if (!messages) {
			throw new Error(
				`Messages for channel with id ${channelId} not found.`
			);
		}

		console.log(
			`Messages for channel with id ${channelId} deleted.`,
			messages
		);

		const updatedCourse = await Course.findOneAndUpdate(
			{ channel: channelId },
			{ $unset: { channel: "" } },
			{ new: true }
		);

		if (!updatedCourse) {
			throw new Error(`Course with channel ${channelId} not found.`);
		}

		console.log(`Course with channel ${channelId} updated.`);
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
