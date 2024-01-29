// config/twilio.js
const twilio = require('twilio');
const dotenv = require("dotenv");


dotenv.config();

// Load Twilio credentials from environment variables or configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC5e611750c476468f10b10ffa0fbaa733';
const authToken = process.env.TWILIO_AUTH_TOKEN || '37bceaacb09588fb83bdd24ae74d6a7e';
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+16592227682';

// Initialize the Twilio client
const twilioClient = twilio(accountSid, authToken);

module.exports = {
  sendOTP: async (phoneNumber, otp) => {
    try {
      const message = await twilioClient.messages.create({
        body: `Your secure OTP is ${otp}. Please use this code to complete your verification. Do not share this code. Valid for 5 minutes.`,
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
