const mongoose = require("mongoose")


const CounsellorPaymentSchema = new mongoose.Schema({
    
    consultantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"consultant"
    },
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    earnings: {
      type: Number,
      required: true
    },
    platformFees: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    }
  });




module.exports = mongoose.model("CounsellorPayment",CounsellorPaymentSchema );