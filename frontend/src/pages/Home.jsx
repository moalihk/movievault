import { useEffect, useState } from "react";
import {
  getMovies,
  getGenres,
  deleteMovie
} from "../services/api";

import MovieForm from "../components/MovieForm";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getMovies();
      setMovies(response.data);
      setError("");
    } catch (error) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    const response = await getGenres();
    setGenres(response.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  if (loading) {
    return <h2>Loading movies...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>MovieVault</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <MovieForm
        genres={genres}
        onMovieAdded={fetchMovies}
        editingMovie={editingMovie}
        clearEditing={() => setEditingMovie(null)}
      />

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <h2>{movie.title}</h2>

            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Status:</strong> {movie.watchStatus}</p>
            <p><strong>Platform:</strong> {movie.streamingPlatform}</p>
            <p><strong>Genre:</strong> {movie.genre?.name}</p>
            <p><strong>Mood:</strong> {movie.personalMood}</p>

            <div className="card-actions">
              <button onClick={() => setEditingMovie(movie)}>
                Edit
              </button>

              <button onClick={() => handleDelete(movie._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;