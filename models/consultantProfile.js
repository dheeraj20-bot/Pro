const mongoose = require("mongoose")

const consultantProfileSchema = new mongoose.Schema({
    age:{
        type:String
    },
    about:{
        tyoe:String
    }
})

modules.exports = mongoose.model("ConsultantProfile",consultantProfileSchema)