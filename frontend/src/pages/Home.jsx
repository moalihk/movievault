import { useEffect, useState } from "react";
import {
  getMovies,
  getGenres,
  deleteMovie
} from "../services/api";

import MovieForm from "../components/MovieForm";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

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

    const interval = setInterval(() => {
      fetchMovies();
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

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MovieForm
        genres={genres}
        onMovieAdded={fetchMovies}
        editingMovie={editingMovie}
        clearEditing={() => setEditingMovie(null)}
      />

      <MovieList
        movies={filteredMovies}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Home;