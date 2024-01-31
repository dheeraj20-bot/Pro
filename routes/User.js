// Import the required modules
const express = require("express")
const router = express.Router()

const {
  Studentlogin,
  Studentsignup,
  Studentsendsignupotp,
  Studentsendloginotp
} = require("../controllers/Auth/StudentAuth")

const {
  Consultantsignup,
  Counsultantsendsignupotp
} = require("../controllers/Auth/CounsellorAuth")

const {
  expertise
} = require("../controllers/Expertise")
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
router.post("/login", Studentlogin)
// // Route for user signup
router.post("/signup", Studentsignup)

router.post("/consultant/signup", Consultantsignup)

router.post("/expertise", expertise)



// // Route for sending OTP to the user's email
router.post("/sendloginotp", Studentsendloginotp)

router.post("/sendsignupotp", Studentsendsignupotp)
router.post("/consultant/sendsignupotp", Counsultantsendsignupotp)


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