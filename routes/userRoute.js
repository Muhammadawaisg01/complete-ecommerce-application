

const express = require("express");
const { registerNewUser, loginUser, logoutUser, forgotPassword,
    updatePassword, resetPassword, getAllUsers,
    getSingleUser, getUserDetails, updateUserProfile, updateProfile, deleteUser, updateUserRole } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerNewUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/getallusers").get(getAllUsers);

router.route("/getsingleuser/:id").get(getSingleUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/delete/:id").delete(isAuthenticatedUser, deleteUser);

router.route("/updateuserrole/:id").put(isAuthenticatedUser, updateUserRole);

module.exports = router;
