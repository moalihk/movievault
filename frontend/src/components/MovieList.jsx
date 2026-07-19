import MovieCard from "./MovieCard";

function MovieList({
  movies,
  handleDelete,
  setEditingMovie
}) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          handleDelete={handleDelete}
          setEditingMovie={setEditingMovie}
        />
      ))}
    </div>
  );
}

export default MovieList;