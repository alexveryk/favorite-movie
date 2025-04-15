import PropTypes from "prop-types";
import styles from "./MovieCard.module.css";
import { Rating } from "../Rating/Rating";

export const MovieCard = ({ movie, onAddToFavorites, isFavorite }) => {
  const handleFavoriteClick = () => {
    onAddToFavorites(movie); // Оновлюємо список улюблених у батьківському компоненті
  };

  return (
    <div className={styles.movieContainer}>
      <div className={styles.movieContainer__thumb}>
        <Rating
          className={styles.movieContainer__rating}
          rating={movie.vote_average}
        />
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <button
          className={`${styles.heartButton} ${
            isFavorite ? styles.heartActive : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "red" : "none"}
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.heartIcon}>
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>
      <div className={styles.movieContainer__info}>
        <h2 className={styles.movieContainer__title}>
          {movie.title.length > 18
            ? movie.title.slice(0, 18) + "…"
            : movie.title}
        </h2>
        <p className={styles.movieContainer__year}>
          {movie.release_date.slice(0, 4)}
        </p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired, // Передаємо прапор з батьківського компонента
};
