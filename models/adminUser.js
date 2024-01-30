const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role:{
      type:String,
      default:"Admin"
    },
    token:{
        type:String
    }

  });

module.exports= mongoose.model("Admin",adminSchema)
