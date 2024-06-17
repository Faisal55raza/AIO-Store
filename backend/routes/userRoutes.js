const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUSers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthentication, authorizeroles } = require("../middleware/authentication")

const router =  express.Router();




router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get( isAuthentication ,getUserDetails);
router.route("/password/update").put(isAuthentication ,updatePassword);
router.route("/me/update").put(isAuthentication ,updateProfile);
router.route("/admin/users").get(isAuthentication,authorizeroles("admin"),getAllUSers);
router.route("/admin/user/:id").get(isAuthentication,authorizeroles("admin"),getSingleUser)
                               .put(isAuthentication,authorizeroles("admin"),updateUserRole)
                               .delete(isAuthentication,authorizeroles("admin"),deleteUser);


module.exports = router;
