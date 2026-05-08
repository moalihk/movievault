const express = require("express");
const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getTopRatedMovies
} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
router.get("/stats/top-rated", getTopRatedMovies);

module.exports = router;