const mongoose = require('mongoose');

const expertiseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  consultantid:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"consultant"
  }]
});


module.exports = mongoose.model("expertise",expertiseSchema)