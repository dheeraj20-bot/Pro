const mongoose = require("mongoose")

const consultantProfileSchema = new mongoose.Schema({
    age:{
        type:String
    },
    about:{
        type:String
    },
    chatPricing: {
        type: Number,
        default:5
    }
})

module.exports = mongoose.model("ConsultantProfile",consultantProfileSchema)