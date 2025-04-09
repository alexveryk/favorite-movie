import PropTypes from "prop-types";
import styles from "./MovieCard.module.css";
import { Rating } from "../Rating/Rating";

export const MovieCard = ({ movie }) => {
  console.log(movie);
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
          alt=""
        />
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
    release_date: PropTypes.number.isRequired,
  }).isRequired,
};
