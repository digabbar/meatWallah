const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/authController");
const {
  isAuthenticatatedUser,
  authorizeRoles,
} = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/me").get(isAuthenticatatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatatedUser, authorizeRoles("admin"), allUsers);
router
  .route("/admin/users/:id")
  .get(isAuthenticatatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatatedUser, authorizeRoles("admin"), updateUserProfile)
  .delete(isAuthenticatatedUser, authorizeRoles("admin"), deleteUserProfile);
router.route("/logout").get(logoutUser);
module.exports = router;
