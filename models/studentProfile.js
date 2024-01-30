const mongoose = require("mongoose")

const studentProfileSchema = new mongoose.Schema({
    age: String,
    Qualification: [String],
    description: String,
  });

module.exports = mongoose.model("StudentProfile",studentProfileSchema)