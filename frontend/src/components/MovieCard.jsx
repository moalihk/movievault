import { useEffect, useState } from "react";
import { getReviewsByMovie } from "../services/api";

function MovieCard({ movie, handleDelete, setEditingMovie }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsByMovie(movie._id);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [movie._id]);

  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>

      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Status:</strong> {movie.watchStatus}</p>
      <p><strong>Platform:</strong> {movie.streamingPlatform}</p>
      <p><strong>Genre:</strong> {movie.genre?.name}</p>
      <p><strong>Mood:</strong> {movie.personalMood}</p>

      <div className="reviews-box">
        <strong>Reviews:</strong>
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <p key={review._id}>
              {review.reviewerName}: {review.comment} ({review.score}/10)
            </p>
          ))
        )}
      </div>

      <div className="card-actions">
        <button onClick={() => setEditingMovie(movie)}>
          Edit
        </button>

        <button onClick={() => handleDelete(movie._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default MovieCard;