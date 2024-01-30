// Import the required modules
const express = require("express")
const router = express.Router()

const {
  login,
  signup,
  sendsignupotp,
  sendloginotp
  // changePassword,
} = require("../controllers/Auth/StudentAuth")
// const {
//   resetPasswordToken,
//   resetPassword,
// } = require("../controllers/ResetPassword")


// const { auth } = require("../middlewares/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)
// // Route for user signup
router.post("/signup", signup)

// // Route for sending OTP to the user's email
router.post("/sendloginotp", sendloginotp)

router.post("/sendsignupotp", sendsignupotp)


// // Route for Changing the password
// router.post("/changepassword", auth, changePassword)

// // ********************************************************************************************************
// //                                      Reset Password
// // ********************************************************************************************************

// // Route for generating a reset password token
// router.post("/reset-password-token", resetPasswordToken)

// // Route for resetting user's password after verification
// router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router