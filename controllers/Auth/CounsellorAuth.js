const bcrypt = require("bcrypt");
const OTP = require("../../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
require("dotenv").config();
const Counsellorprofile = require("../../models/consultantProfile")
const User = require("../../models/consultantUser")
const Expertise = require("../../models/expertise")


exports.Consultantsignup = async (req, res) => {
  try {
      const {
          username,
          email,
          phoneNumber,
          password,
          expertiseId,
          otp,
      } = req.body;

      if (!username || !expertiseId || !phoneNumber || !password || !email ||!otp) {
       
          return res.status(403).send({
              success: false,
              message:"All fields are required",
          });
      }

      const existingUser = await User.findOne({
          $or: [{
              email
          }, {
              phoneNumber
          }],
      });

      if (existingUser) {
          return res.status(400).json({
              success: false,
              message: "User with the provided email or phone number already exists. Please sign in to continue.",
          });
      }

      const response = await OTP.find({
          phoneNumber
      }).sort({
          createdAt: -1
      }).limit(1);
      if (response.length === 0) {
          // OTP not found for the email
          return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
          });
      } else if (otp !== response[0].otp) {
          // Invalid OTP
          return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
          });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const profileDetails = await Counsellorprofile.create({
          age: null,
          about: null
        });

      const user = await User.create({
          username,
          phoneNumber,
          email,
          expertiseId,
          password:hashedPassword,
          profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
          additionalDetails: profileDetails._id
      });
      
      for (const id of expertiseId) {
        await Expertise.updateOne(
            { _id: id },
            { $push: { consultantId: user._id } }
        )
    }

      user.password = undefined
      return res.status(200).json({
          success: true,
          user,
          Expertise,
          message: "User registered successfully",
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
      });
  }
};


exports.Counsultantsendsignupotp = async (req, res) => {
	try {
		const { phoneNumber } = req.body;
        
        if(!phoneNumber){
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
		
		const checkUserPresent = await User.findOne({ phoneNumber });

		// If user found with provided email
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
		const result = await OTP.findOne({ otp: otp });
	
		
		const otpPayload = { phoneNumber, otp };
		const otpBody = await OTP.create(otpPayload);

		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};
