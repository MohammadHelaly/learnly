const express = require("express");
const courseEnrollmentController = require("../controllers/courseEnrollmentController");

const router = express.Router();

router.route("/");
// .get(courseEnrollmentController.getCourseEnrollment)

router.route("/:courseId").post(courseEnrollmentController.enrollUser);
router.route("/").get(courseEnrollmentController.getAllCourseEnrollments);
module.exports = router;
