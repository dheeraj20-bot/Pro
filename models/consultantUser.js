
const mongoose = require("mongoose");

const consultantSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    expertiseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "expertise"
    }],
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConsultantProfile",
    },
    role: {
        type: String,
        default: "Consultant"
    },
    active: {
        type: Boolean,
        default: true,
    },
    availability: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
});

module.exports = mongoose.model("consultant", consultantSchema);
