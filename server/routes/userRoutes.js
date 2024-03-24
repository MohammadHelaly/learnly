const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/authenticateMe", authController.isLoggedIn);

router.post("/forgotPassword", authController.forgotPassword);

router.patch("/resetPassword/:token", authController.resetPassword);

router.route("/newsletter-subscribe").post(userController.subscribeNewsletter);
router
  .route("/newsletter-unsubscribe")
  .post(userController.unsubscribeNewsletter);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);

router.get("/me", userController.getMe, userController.getUser);

router.patch(
  "/updateMe",
  // userController.resizeUserPhoto,
  userController.uploadUserPhoto,
  userController.updateMe
);

// Different from delete user, this one just sets the active field to false to keep the user's data in the database
router.delete("/deleteMe", userController.deleteMe);

// Restrict all routes after this middleware to admin only
router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
