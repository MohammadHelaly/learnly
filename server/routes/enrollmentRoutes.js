const express = require("express");
const enrollmentController = require("../controllers/enrollmentController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
	.route("/")
	.get(
		authController.protect,
		// authController.restrictTo("admin"),
		enrollmentController.getAllEnrollments
	)
	.post(
		authController.protect,
		enrollmentController.setCourseUserIds,
		enrollmentController.enrollUser
	);

router
	.route("/:id")
	.get(enrollmentController.getEnrollment)
	.patch(
		authController.protect,
		authController.restrictTo("admin"), // TODO: check if this is correct
		enrollmentController.updateEnrollment
	)
	.delete(
		authController.protect,
		authController.restrictTo("admin"), // TODO: check if this is correct
		enrollmentController.deleteEnrollment
	);

module.exports = router;
