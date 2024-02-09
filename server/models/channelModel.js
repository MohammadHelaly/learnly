const mongoose = require("mongoose");

const channelModel = mongoose.Schema(
	{
		name: { type: String, trim: true },
		isCourseChannel: { type: Boolean, default: true, required: true },
		users: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
		latestMessage: {
			type: mongoose.Schema.ObjectId,
			ref: "Message",
		},
		admins: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

const Channel = mongoose.model("Channel", channelModel);

module.exports = Channel;
