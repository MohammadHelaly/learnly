const express = require("express");
const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route("/").get(messageController.getAllMessages).post(
	// authController.restrictTo("user", "instructor"),
	messageController.setChannelUserIds,
	messageController.createMessage
);

router
	.route("/:id")
	.get(messageController.getMessage)
	.patch(
		authController.protect,
		messageController.protectMessage,
		// authController.restrictTo("user", "admin"),
		messageController.updateMessage
	)
	.delete(
		authController.protect,
		messageController.protectMessage,
		// authController.restrictTo("user", "admin"),
		messageController.deleteMessage
	);

module.exports = router;
