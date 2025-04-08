import PropTypes from "prop-types";
import styles from "./MovieCard.module.css";

export const MovieCard = ({ movie }) => {
  console.log(movie);
  return (
    <div className={styles.movieContainer}>
      <div className={styles.movieContainer__thumb}>
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
        <p className={styles.movieContainer__year}>{movie.release_date}</p>
        <p className={styles.movieContainer__rating}>
          Рейтинг: {movie.vote_average}
        </p>
        <button className={styles.movieContainer__button}>Більше...</button>
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
  }).isRequired,
};
