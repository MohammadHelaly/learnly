const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");
const channelRouter = require("./channelRoutes");
const sectionRouter = require("./sectionRoutes");
const enrollmentRouter = require("./enrollmentRoutes");

const router = express.Router();

router.use("/:courseId/reviews", reviewRouter);

router.use("/:courseId/channels", channelRouter);

router.use("/:courseId/sections", sectionRouter);

router.use("/:courseId/enrollments", enrollmentRouter);

router.route("/").get(courseController.getAllCourses).post(
	authController.protect,
	// authController.restrictTo("admin", "instuctor"),
	courseController.getCourseInstructorID,
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

router.route("/:id/updateCourse").patch(courseController.updateCourse);

router
	.route("/:id")
	.get(courseController.getCourse)
	.patch(
		authController.protect,
		courseController.protectCourse,
		// authController.restrictTo("admin", "instructor"),
		courseController.deleteCourseImage,
		courseController.uploadCourseImage,
		courseController.updateCourse
	)
	.delete(
		authController.protect,
		courseController.protectCourse,
		authController.restrictTo("admin", "instructor"),
		courseController.deleteCourseImage
	)
	.put(
		authController.protect,
		courseController.protectCourse,
		courseController.updateCourse
	);
module.exports = router;
