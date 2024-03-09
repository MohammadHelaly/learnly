const express = require("express");
const sectionController = require("../controllers/sectionController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(sectionController.getAllSections).post(
	authController.protect,
	// authController.restrictTo("user", "instructor"),
	sectionController.setCourseUserIds,
	sectionController.createSection
);

router
	.route("/:id")
	.get(sectionController.getSection)
	.patch(
		authController.protect,
		// authController.restrictTo("user", "admin"),
		////////////////////////////////////////////////
		// TODO: ADD MODULE VIDEO UPLOAD MIDDLEWARE HERE
		////////////////////////////////////////////////
		sectionController.updateSection
	)
	.delete(
		authController.protect,
		// authController.restrictTo("user", "admin"),
		sectionController.deleteSection
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
