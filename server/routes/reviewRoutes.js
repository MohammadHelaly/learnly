const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
	.route("/")
	.get(reviewController.getAllReviews)
	.post(
		authController.protect,
		reviewController.checkEnrollment,
		reviewController.setCourseUserIds,
		reviewController.createReview
	);

router
	.route("/:id")
	.get(reviewController.getReview)
	.patch(
		authController.protect,
		reviewController.protectReview,
		reviewController.updateReview
	)
	.delete(
		authController.protect,
		reviewController.protectReview,
		reviewController.deleteReview
	);

module.exports = router;
