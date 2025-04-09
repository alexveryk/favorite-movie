import styles from "./MoviesList.module.css";

import { useState } from "react";
import { useEffect } from "react";
import { getTrending } from "../../services/api";
import { MovieCard } from "../MovieCard/MovieCard";

export const MoviesList = () => {
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
                <MovieCard movie={movie} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don&apos;t have any reviews for this movie</p>
      )}
    </>
  );
};
