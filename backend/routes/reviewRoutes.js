const express = require("express");
const {
  getReviewsByMovie,
  createReview
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/movie/:movieId", getReviewsByMovie);
router.post("/", createReview);

module.exports = router;