const bcrypt = require("bcrypt");
const OTP = require("../../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
require("dotenv").config();
const StudentProfile = require("../../models/studentProfile")
const User = require("../../models/studentUser")

exports.signup = async(req,res)=>{
    try{
         const {username,
            email,
            phoneNumber,
            otp
        } = req.body

     if(
        !username ||
        !phoneNumber ||
        !email
     ){return res.status(403).send({
        success: false,
        message: "All Fields are required",
    });}
     
    const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with the provided email or phone number already exists. Please sign in to continue.",
        });
      }
    
    const response = await OTP.find({ phoneNumber }).sort({ createdAt: -1 }).limit(1);
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
    
        const profileDetails = await StudentProfile.create({
			gender: null,
			Qualification: null,
			description: null,
		});

        const user = await User.create({
            username,
            phoneNumber,
            email,
            profileImage:`https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
            additionalDetails:profileDetails._id
        })

    return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});


    }
    catch(error){
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
    }
}

exports.sendloginotp = async (req, res) => {
	try {
		const { phoneNumber } = req.body;
        
        if(!phoneNumber){
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
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

exports.sendsignupotp = async (req, res) => {
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

exports.login = async (req,res) =>{
    try{
        const {phoneNumber,otp} = req.body
        
        if(!phoneNumber || !otp){
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
     
        const user = await User.findOne({ phoneNumber }).populate("additionalDetails");

        if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

        const response = await OTP.find({ phoneNumber }).sort({ createdAt: -1 }).limit(1);

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
        
        // If OTP is valid, proceed with user login
        const token = jwt.sign(
            { phoneNumber: user.phoneNumber, id: user._id, accountType: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );
        user.token = token;
        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
        });
    }
    catch(error){


    }
}

