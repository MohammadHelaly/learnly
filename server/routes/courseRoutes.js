const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.use("/:courseId/reviews", reviewRouter);

router.route("/").get(courseController.getAllCourses).post(
	// authController.protect,
	// authController.restrictTo("admin", "instuctor"),
	courseController.uploadCourseImage,
	courseController.createCourse
);

// router
// 	.route("/top-5-cheapest")
// 	.get(
// 		courseController.aliasTop5CheapestCourses,
// 		courseController.getAllCourses
// 	);

// router.route("/course-stats").get(courseController.getCourseStats);

// router
// 	.route("/monthly-plan/:year")
// 	.get(
// 		authController.protect,
// 		authController.restrictTo("admin", "instructor"),
// 		courseController.getMonthlyPlan
// 	);

router
	.route("/:id")
	.get(courseController.getCourse)
	.patch(
		authController.protect,
		authController.restrictTo("admin", "instructor"),
		courseController.updateCourse
	)
	.delete(
		authController.protect,
		authController.restrictTo("admin", "instructor")
	);

module.exports = router;
