const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
	.route("/")
	.get(reviewController.getAllReviews)
	.post(
		authController.protect,
		authController.restrictTo("user", "instructor"),
		reviewController.setCourseUserIds,
		reviewController.createReview
	);

router
	.route("/:id")
	.get(reviewController.getReview)
	.patch(
		authController.protect,
		authController.restrictTo("user", "admin", "instructor"),
		reviewController.updateReview
	)
	.delete(
		authController.protect,
		authController.restrictTo("user", "admin", "instructor"),
		reviewController.deleteReview
	);

module.exports = router;
