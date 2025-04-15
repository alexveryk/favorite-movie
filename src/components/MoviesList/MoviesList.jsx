import styles from "./MoviesList.module.css";

import { useRef, useState } from "react";
import { useEffect } from "react";
import { getTrending } from "../../services/api";
import { MovieCard } from "../MovieCard/MovieCard";
import { Button } from "../Button/Button";

export const MoviesList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current) return; // 👈 блокуємо подвійний виклик
      isFetching.current = true;

      try {
        console.log("fetchData called");
        setLoading(true);
        const response = await getTrending(page);
        console.log(response.data.results);
        setMovies((prev) => [...prev, ...response.data.results]);
        console.log(movies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };
    fetchData();
  }, [page]);

  const handleClick = (evt) => {
    evt.preventDefault();
    setpage((prev) => prev + 1);
    console.log("Button");
  };

  return (
    <>
      {loading && <p>Loading...</p>}

      {movies.length > 0 ? (
        <>
          {" "}
          <ul className={styles.movieList}>
            {movies.map((movie) => {
              return (
                <li className={styles.movieItem} key={movie.id}>
                  <MovieCard movie={movie} />
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center m-6 shadow-gray-950">
            <Button title="Завантажити ще..." onClick={handleClick} />
          </div>
        </>
      ) : (
        <p>We don&apos;t have any reviews for this movie</p>
      )}
    </>
  );
};
