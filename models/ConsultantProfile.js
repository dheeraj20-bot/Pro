const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:true
    },
    chatPricing:{
        type:Number,
        required:true
    },
    headline:{
        type:String,
        required:true,
        trim:true
    },
    experience:{
         type:Number,
         required:true,   
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    City: {
        type: String,
        required: true,
        trim: true
    },
    state:{
        type: String,
        required: true,
        trim: true
    },
    Skills:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "expertise"
    }],
    pincode:{
        type: Number,
        required: true
    },
    MartialStatus:{
        type: String,
        required: true,
        enum: ["Single", "Married"]
    },
    Language: {
        type: [String], 
        required: true,
        enum: ["Hindi", "English"] 
    }
});

module.exports = mongoose.model("ConsultantProfile", profileSchema);
