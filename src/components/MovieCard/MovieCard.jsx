import PropTypes from "prop-types";
import { Rating } from "../Rating/Rating";
import styles from "./MovieCard.module.css";

export const MovieCard = ({ movie }) => {
  return (
    <div className={styles.movieContainer}>
      <div className={styles.movieContainer__thumb}>
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt=""
        />
      </div>
      <span className={styles.movie__name}>{movie.title}</span>
      <Rating rating={movie.vote_average} title={movie.vote_count} />
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
  }).isRequired,
};
