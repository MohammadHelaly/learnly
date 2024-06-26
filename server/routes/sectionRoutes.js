const express = require("express");
const sectionController = require("../controllers/sectionController");
const authController = require("../controllers/authController");
const formidable = require("express-formidable");
const router = express.Router({ mergeParams: true });

router
	.route("/")
	.get(authController.protect, sectionController.getAllSections)
	.post(
		authController.protect,
		// authController.restrictTo("user", "instructor"),
		sectionController.protectCourse, //prevent any user from editing other than the course instructor
		sectionController.setCourseUserIds,
		sectionController.createSection
	);

router
	.route("/:id/modules/:moduleNumber/video")
	.post(
		authController.protect,
		sectionController.protectCourse, //prevent any user from editing other than the course instructor
		formidable(),
		sectionController.uploadModuleVideo
	)
	.patch(
		authController.protect,
		sectionController.protectCourse, //prevent any user from editing other than the course instructor
		sectionController.getVideoKey,
		sectionController.deleteModuleVideoAndUpdateSection,
		sectionController.updateSection
	)
	.delete(
		authController.protect,
		sectionController.protectCourse, //prevent any user from editing other than the course instructor
		sectionController.getVideoKey,
		sectionController.deleteModuleVideo
	);

// For deleting a module
router.route("/:id/modules/:moduleNumber").delete(
	authController.protect,
	sectionController.protectCourse, //prevent any user from editing other than the course instructor
	sectionController.deleteModule,
	sectionController.updateSection
);

router
	.route("/:id")
	.get(sectionController.getSection)
	.patch(
		authController.protect,
		sectionController.protectCourse, //prevent any user from editing other than the course instructor
		// authController.restrictTo("user", "admin"),
		sectionController.updateSection
	)
	.delete(
		authController.protect,
		sectionController.protectCourse, //prevent any user from editing other than the course instructor
		// authController.restrictTo("user", "admin"),
		sectionController.deleteSection
	)
	.put(
		authController.protect,
		sectionController.protectCourse, //prevent any user from editing other than the course instructor
		// authController.restrictTo("user", "admin"),
		sectionController.addModule
	);

module.exports = router;
