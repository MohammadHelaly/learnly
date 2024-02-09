const mongoose = require("mongoose");
const Channel = require("./channelModel");

const messageSchema = mongoose.Schema(
	{
		sender: { type: mongoose.Schema.ObjectId, ref: "User" },
		content: { type: String, trim: true },
		channel: { type: mongoose.Schema.ObjectId, ref: "Channel" },
		readBy: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
