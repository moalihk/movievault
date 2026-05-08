const Review = require("../models/Review");

const getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({
      movie: req.params.movieId
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getReviewsByMovie,
  createReview
};