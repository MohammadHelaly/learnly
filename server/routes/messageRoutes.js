const express = require("express");
const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
	.route("/")
	.get(authController.protect, messageController.getAllMessages)
	.post(
		// authController.restrictTo("user", "instructor"),
		authController.protect,
		messageController.setChannelUserIds,
		messageController.protectChannel,
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
