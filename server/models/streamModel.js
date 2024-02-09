const mongoose = require("mongoose");
const Channel = require("./channelModel");

const streamSchema = mongoose.Schema(
	{
		instructor: { type: mongoose.Schema.ObjectId, ref: "User" },
		content: { type: {} },
		channel: { type: mongoose.Schema.ObjectId, ref: "Channel" },
		startedAt: { type: Date, default: Date.now, required: true },
		endedAt: { type: Date, default: null, required: true },
	},
	{ timestamps: true }
);

const Stream = mongoose.model("Stream", streamSchema);
module.exports = Stream;
