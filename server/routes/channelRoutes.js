const express = require("express");
const channelController = require("../controllers/channelController");
const messageRouter = require("./messageRoutes");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use("/:channelId/messages", messageRouter);

router.use(authController.protect);

router.route("/").get(channelController.getAllChannels).post(
	// authController.restrictTo("user", "instructor"),
	channelController.setCourseUserIds,
	channelController.createChannel
);

router
	.route("/:id")
	.get(channelController.getChannel)
	.patch(
		// authController.restrictTo("user", "admin"),
		channelController.updateChannel
	)
	.delete(
		// authController.restrictTo("user", "admin"),
		channelController.deleteChannel
	);

module.exports = router;
