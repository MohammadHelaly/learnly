const express = require("express");
const sectionController = require("../controllers/sectionController");
const authController = require("../controllers/authController");
const formidable = require("express-formidable");

const router = express.Router({ mergeParams: true });

router.route("/").get(sectionController.getAllSections).post(
	authController.protect,
	// authController.restrictTo("user", "instructor"),
	sectionController.setCourseUserIds,
	sectionController.createSection
);

router
	.route("/:id/modules/:moduleNumber/video")
	.post(formidable(), sectionController.uploadModuleVideo)
	.patch(
		authController.protect,
		sectionController.getVideoKey,
		sectionController.deleteModuleVideoAndUpdateSection,
		sectionController.updateSection
	)
	.delete(
		authController.protect,
		sectionController.getVideoKey,
		sectionController.deleteModuleVideo
	);

router
	.route("/:id/modules/:moduleNumber")
	//DELETE MODULE HERE
	.delete(
		authController.protect,
		sectionController.deleteModule,
		sectionController.updateSection
	);

router
	.route("/:id")
	.get(sectionController.getSection)
	.patch(
		authController.protect,
		// authController.restrictTo("user", "admin"),
		sectionController.updateSection
	)
	.delete(
		authController.protect,
		// authController.restrictTo("user", "admin"),
		sectionController.deleteSection
	)
	.put(
		authController.protect,
		// authController.restrictTo("user", "admin"),
		sectionController.addModule
	);

// router
// 	.route("/:id/modules")
// 	.post(
// 	 authController.protect,
// 	 // authController.restrictTo("user", "admin"),
// 	 sectionController.addModule
// 	 )
// 	.delete(
// 	 authController.protect,
// 	// authController.restrictTo("user", "admin"),
// 	 sectionController.deleteModule
// 	 )
// 	.patch(
// 	 authController.protect,
// 	// authController.restrictTo("user", "admin"),
// 	 sectionController.updateModule
// 	 );

module.exports = router;
