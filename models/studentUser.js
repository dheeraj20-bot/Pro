const mongoose = require("mongoose");


const StudentSchema = new mongoose.Schema({
     username:{
        type:String,
        required:true,
        trim:true
     },
     email:{
        type:String,
        required:true,
        trim:true
     },
     phoneNumber:{
        type:Number,
        required:true,
     },
     additionalDetails:{
         type:mongoose.Schema.Types.ObjectId,
         ref: "StudentProfile",
     },
     active:{
        type:Boolean,
        default: true,
     },
     role:{
        type:String,
        default:"Student"
     },
     token:{
        type:String
     },
     profileImage:{
        type:String
     }
})

module.exports = mongoose.model("student", StudentSchema);