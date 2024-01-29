// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{
		email:{
          type:String,
		  required:true,
		  trim:true
		},
		phoneNumber:{
			type:Number,
			required:true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		// studentDetails: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	required:function(){
		// 		return this.role==="Student";
		// 	},
		// 	ref:"StudentProfile",
		// },
		// instructorDetails:{
		// 	type:mongoose.Schema.Types.ObjectId,
		// 	required:function(){
		// 		return this.role==="Consultant";
		// 	},
		// 	ref:"ConsultantProfile"	
		// },
		role:{
			type:String,
			required:true,
			enum:["Student","Consultant","Admin"],
			default:"Student"
		},
		token: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("user", userSchema);