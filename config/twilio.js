// config/twilio.js
const twilio = require('twilio');
const dotenv = require("dotenv");


dotenv.config();

// Load Twilio credentials from environment variables or configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN 
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER 

// Initialize the Twilio client
const twilioClient = twilio(accountSid, authToken);

module.exports = {
  sendOTP: async (phoneNumber, otp) => {
    try {
      const message = await twilioClient.messages.create({
        body: `Your secure OTP is ${otp} for Pro&Clients LoginSetup. Please use this code to complete your verification. Do not share this code. Valid for 1 minute.`,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });

      console.log(`OTP sent to ${phoneNumber}:`, message.sid);

    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },
};
