const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
	{
		sender: { type: mongoose.Schema.ObjectId, ref: "User" },
		content: { type: String, trim: true },
		channel: { type: mongoose.Schema.ObjectId, ref: "Channel" },
		readBy: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
		edited: { type: Boolean, default: false },
		deleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

messageSchema.pre("findOneAndUpdate", function (next) {
	this._update.edited = true;
	next();
});

messageSchema.pre(/^find/, function (next) {
	this.populate({
		path: "sender",
		select: "id name photo",
	});
	next();
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
