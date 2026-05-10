function MovieCard({ movie, handleDelete }) {
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>

      <p>
        <strong>Director:</strong> {movie.director}
      </p>

      <p>
        <strong>Year:</strong> {movie.year}
      </p>

      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>

      <p>
        <strong>Status:</strong> {movie.watchStatus}
      </p>

      <p>
        <strong>Platform:</strong> {movie.streamingPlatform}
      </p>

      <p>
        <strong>Genre:</strong> {movie.genre?.name}
      </p>

      <p>
        <strong>Mood:</strong> {movie.personalMood}
      </p>

      <button onClick={() => handleDelete(movie._id)}>
        Delete
      </button>
    </div>
  );
}

export default MovieCard;