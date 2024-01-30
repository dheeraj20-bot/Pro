const mongoose = require("mongoose")


const consultantSchema = new mongoose.Schema({
   username: {
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
   expertise:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"expertise"
   }],
   additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ConsultantProfile",
   },
   availability: {
     type: Boolean,
     default: true
   },
   chatPricing: {
     type: Number,
     required: true
   },
   token:{
      type:String
   }
 });
 

module.exports = mongoose.model("consultant", consultantSchema);