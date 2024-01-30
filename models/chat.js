const mongoose = require("mongoose")

const chatRoomSchema = new mongoose.Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    consultantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active'
    },
    chathistory: [String],
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: Date
  });
  

module.exports = mongoose.model("ChatRoom",chatRoomSchema)