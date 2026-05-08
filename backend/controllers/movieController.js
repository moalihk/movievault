const Movie = require("../models/Movie");

const getMovies = async (req, res) => {
  try {
    const { search, status } = req.query;

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (status) {
      filter.watchStatus = status;
    }

    const movies = await Movie.find(filter).populate("genre").sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie" });
  }
};

const getTopRatedMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("genre").sort({ rating: -1 }).limit(5);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top rated movies" });
  }
};

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getTopRatedMovies
};