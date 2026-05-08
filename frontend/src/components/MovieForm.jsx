import { useEffect, useState } from "react";
import { createMovie, updateMovie } from "../services/api";

function MovieForm({
  genres,
  onMovieAdded,
  editingMovie,
  clearEditing
}) {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    year: "",
    rating: "",
    watchStatus: "Plan to Watch",
    streamingPlatform: "",
    personalMood: "",
    genre: ""
  });

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title,
        director: editingMovie.director,
        year: editingMovie.year,
        rating: editingMovie.rating,
        watchStatus: editingMovie.watchStatus,
        streamingPlatform: editingMovie.streamingPlatform,
        personalMood: editingMovie.personalMood,
        genre: editingMovie.genre?._id || editingMovie.genre
      });
    }
  }, [editingMovie]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      director: "",
      year: "",
      rating: "",
      watchStatus: "Plan to Watch",
      streamingPlatform: "",
      personalMood: "",
      genre: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      ...formData,
      year: Number(formData.year),
      rating: Number(formData.rating)
    };

    try {
      if (editingMovie) {
        await updateMovie(editingMovie._id, movieData);
        clearEditing();
      } else {
        await createMovie(movieData);
      }

      resetForm();
      onMovieAdded();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>
        {editingMovie ? "Edit Movie" : "Add New Movie"}
      </h2>

      <input
        name="title"
        placeholder="Movie title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        name="director"
        placeholder="Director"
        value={formData.director}
        onChange={handleChange}
        required
      />

      <input
        name="year"
        type="number"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />

      <input
        name="rating"
        type="number"
        min="0"
        max="10"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
        required
      />

      <select
        name="watchStatus"
        value={formData.watchStatus}
        onChange={handleChange}
      >
        <option>Plan to Watch</option>
        <option>Watching</option>
        <option>Watched</option>
        <option>Rewatching</option>
      </select>

      <input
        name="streamingPlatform"
        placeholder="Streaming platform"
        value={formData.streamingPlatform}
        onChange={handleChange}
        required
      />

      <input
        name="personalMood"
        placeholder="Mood"
        value={formData.personalMood}
        onChange={handleChange}
        required
      />

      <select
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required
      >
        <option value="">Select Genre</option>

        {genres.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>

      <button type="submit">
        {editingMovie ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
}

export default MovieForm;