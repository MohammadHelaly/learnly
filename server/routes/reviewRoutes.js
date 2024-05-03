const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(reviewController.getAllReviews).post(
  authController.protect,
  //TODO: Middleware to check if user is enrolled in course before adding review
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
