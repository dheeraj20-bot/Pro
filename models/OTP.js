const mongoose = require("mongoose");
const twilioConfig = require('../config/twilio');


const OTPSchema = new mongoose.Schema({
	phoneNumber: {
		type: String,
		required: true,
	},
	otp:{
		type: String,
		required:true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 1,
	},
});

// Define a function to send emails
OTPSchema.pre('save', async function (next) {
	console.log('Pre-save hook triggered');
  
	if (this.isNew) {
	  try {
		await twilioConfig.sendOTP(this.phoneNumber, this.otp);
		console.log('OTP sent via Twilio to', this.phoneNumber);
	  } catch (error) {
		console.error('Error sending OTP via Twilio:', error);
		throw error;
	  }
	}
	next();
  });
  
  const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;