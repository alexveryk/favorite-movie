import PropTypes from "prop-types";
import styles from "./MovieCard.module.css";
import { Rating } from "../Rating/Rating";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { favorites, watched } = useSelector((state) => state.movies);
  const uid = useSelector((state) => state.user.uid);

  const isFavorite =
    Array.isArray(favorites) && favorites.some((m) => m.id === movie.id);
  const isWatched =
    Array.isArray(watched) && watched.some((m) => m.id === movie.id);

  const handleCardClick = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
    navigate(`/movies/${movie.id}`);
  };

  const handleFavoriteClick = (evt) => {
    evt.stopPropagation();
    dispatch(toggleFavorite({ movie, uid }));
  };

  const handleWatchedClick = (evt) => {
    evt.stopPropagation();
    dispatch(toggleWatched({ movie, uid }));
  };

  return (
    <div className={styles.movieContainer}>
      <div className={styles.thumb} onClick={handleCardClick}>
        {isWatched && (
          <div className={styles.watchedBadge}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.checkIcon}
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M9 16.2l-3.5-3.6L4 14l5 5 12-12-1.4-1.4z" />
            </svg>
            Переглянуто
          </div>
        )}

        <Rating className={styles.rating} rating={movie.vote_average} />

        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />

        <div className={styles.actions}>
          <button
            className={`${styles.iconButton} ${
              isFavorite ? styles.activeFavorite : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label="Додати до улюблених">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFavorite ? "red" : "none"}
              stroke="red"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className={styles.icon}>
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>

          <button
            className={`${styles.iconButton} ${
              isWatched ? styles.activeWatched : ""
            }`}
            onClick={handleWatchedClick}
            aria-label="Позначити як переглянуте"
            title={
              isWatched
                ? "Позначено як переглянуте"
                : "Позначити як переглянуте"
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isWatched ? "#3b82f6" : "none"}
              stroke="#3b82f6"
              strokeWidth="2"
              className={styles.icon}>
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
              <path d="M12 15l3-3-3-3-3 3 3 3z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <h2 className={styles.title}>
          {movie.title.length > 18
            ? `${movie.title.slice(0, 18)}…`
            : movie.title}
        </h2>
        <p className={styles.year}>{movie.release_date.slice(0, 4)}</p>
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
};
