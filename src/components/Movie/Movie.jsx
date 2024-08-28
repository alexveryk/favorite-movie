import styles from "./Movie.module.css";

import { useState } from "react";
import { useEffect } from "react";
import { getTrending } from "../../services/api";
import { Rating } from "../Rating/Rating";

export const Movie = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTrending();
        console.log(response.data.results);
        setReviews(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {movies.length > 0 ? (
        <ul className={styles.movieList}>
          {movies.map((movie) => {
            return (
              <li className={styles.movieItem} key={movie.id}>
                <div className={styles.movieContainer}>
                  <div className={styles.movieContainer__thumb}>
                    <img
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt=""
                    />
                  </div>
                  <span className={styles.movie__name}>{movie.title}</span>
                  <Rating
                    rating={movie.vote_average}
                    title={movie.vote_count}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
};
