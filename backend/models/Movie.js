const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    director: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true,
      min: 1888
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    watchStatus: {
      type: String,
      enum: ["Plan to Watch", "Watching", "Watched", "Rewatching"],
      default: "Plan to Watch"
    },
    streamingPlatform: {
      type: String,
      required: true
    },
    personalMood: {
      type: String,
      required: true
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);