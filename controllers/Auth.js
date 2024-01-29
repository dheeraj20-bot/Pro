const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
require("dotenv").config();
const StudentProfile = require("../models/StudentProfile")

// Signup Controller for Registering USers


exports.signup = async (req, res) => {
	try {
		const {
			email,
			phoneNumber,
			role,
			otp,
		} = req.body;

		if (!email || !phoneNumber || !otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		
		// Check if user already exists
		const existingUser = await User.findOne({
			$or: [{ email }, { phoneNumber }],
		  });	
		  
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		const response = await OTP.find({ phoneNumber }).sort({ createdAt: -1 }).limit(1);
		console.log(response);


		if (response.length === 0) {
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

        
		// const profileDetails = await StudentProfile.create({
		// 	gender: null,
		// 	dateOfBirth: null,
		// 	about: null,
		// });



		const user = await User.create({
			email:email,
			phoneNumber:phoneNumber,
			role:role,
			// studentDetails:profileDetails._id
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} 
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

// Login controller for authenticating users
// exports.login = async (req, res) => {
// 	try {
// 		// Get email and password from request body
// 		const { phoneNumber } = req.body;

// 		// Check if email or password is missing
// 		if (!phoneNumber) {
// 			// Return 400 Bad Request status code with error message
// 			return res.status(400).json({
// 				success: false,
// 				message: `Please Fill PhoneNumber`,
// 			});
// 		}

// 		// Find user with provided email
// 		const user = await User.findOne({ phoneNumber })

// 		if (!user) {
// 			return res.status(401).json({
// 				success: false,
// 				message: `User is not Registered with Us Please SignUp to Continue`,
// 			});
// 		}



// 		// Generate JWT token and Compare Password
// 		if (await bcrypt.compare(password, user.password)) {

// 			const token = jwt.sign(
// 				{ phoneNumber: user.phoneNumber, id: user._id, accountType: user.accountType },
// 				process.env.JWT_SECRET,
// 				{
// 					expiresIn: "24h",
// 				}
// 			);

// 			// Save token to user document in database
// 			user.token = token;
// 			user.password = undefined;
// 			// Set cookie for token and return success response
// 			const options = {
// 				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
// 				httpOnly: true,
// 			};
// 			res.cookie("token", token, options).status(200).json({
// 				success: true,
// 				token,
// 				user,
// 				message: `User Login Success`,
// 			});
// 		} else {
// 			return res.status(401).json({
// 				success: false,
// 				message: `Password is incorrect`,
// 			});
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		// Return 500 Internal Server Error status code with error message
// 		return res.status(500).json({
// 			success: false,
// 			message: `Login Failure Please Try Again`,
// 		});
// 	}
// };
// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
	try {
	  const { phoneNumber } = req.body;
  
	  const checkUserPresent = await User.findOne({ phoneNumber });
  
	  if (checkUserPresent) {
			  // Return 401 Unauthorized status code with error message
			  return res.status(401).json({
				  success: false,
				  message: `User is Already Registered`,
			  });
		  }
  
	  var otp = otpGenerator.generate(6, {
			  upperCaseAlphabets: false,
			  lowerCaseAlphabets: false,
			  specialChars: false,
		  });
  
	  const otpDocument = new OTP({ phoneNumber,otp:otp });
	  await otpDocument.save();
  
	  return res.json({
		   message: 'OTP generated and saved successfully' });
  
	}catch (error) {
		  console.log(error.message);
		  return res.status(500).json({ success: false, error: error.message });
	  }
  }

