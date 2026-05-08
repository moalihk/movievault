const Genre = require("../models/Genre");

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch genres" });
  }
};

const createGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getGenres,
  createGenre
};