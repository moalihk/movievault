const express = require("express");
const {
  getGenres,
  createGenre
} = require("../controllers/genreController");

const router = express.Router();

router.get("/", getGenres);
router.post("/", createGenre);

module.exports = router;