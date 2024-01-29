const mongoose = require("mongoose");

// Define the Tags schema
const expertiseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },

	Consultant:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "ConsultantProfile",
		},
	],
});

module.exports = mongoose.model("expertise", expertiseSchema);