import { useEffect, useState } from "react";
import {
  getMovies,
  getGenres,
  deleteMovie,
  getTopRatedMovies
} from "../services/api";

import MovieForm from "../components/MovieForm";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

function Home() {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      const response = await getMovies();
      const topRatedResponse = await getTopRatedMovies();

      setMovies(response.data);
      setTopRatedMovies(topRatedResponse.data);
      setError("");
    } catch (error) {
      setError("Failed to load movies");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
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
      fetchMovies(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(true);
    fetchGenres();

    const interval = setInterval(() => {
      fetchMovies(false);
    }, 30000);

    return () => clearInterval(interval);
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

      <section className="top-rated-box">
        <h2>Top Rated Movies</h2>
        <ul>
          {topRatedMovies.map((movie) => (
            <li key={movie._id}>
              {movie.title} — {movie.rating}/10
            </li>
          ))}
        </ul>
      </section>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MovieForm
        genres={genres}
        onMovieAdded={() => fetchMovies(false)}
        editingMovie={editingMovie}
        clearEditing={() => setEditingMovie(null)}
      />

      <MovieList
        movies={filteredMovies}
        handleDelete={handleDelete}
        setEditingMovie={setEditingMovie}
      />
    </div>
  );
}

export default Home;