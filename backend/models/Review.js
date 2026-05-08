const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    reviewerName: {
      type: String,
      required: true,
      trim: true
    },
    comment: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);