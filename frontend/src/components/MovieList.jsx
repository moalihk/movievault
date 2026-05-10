import MovieCard from "./MovieCard";

function MovieList({ movies, handleDelete }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default MovieList;