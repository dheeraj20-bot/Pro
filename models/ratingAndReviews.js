const mongoose = require("mongoose")


const ratingReviewsSchema = new mongoose.Schema({
    consultantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultant',
      required: true
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    rating: Number,
    reviews: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  });


module.exports = mongoose.model("ratingandreviews",ratingReviewsSchema)