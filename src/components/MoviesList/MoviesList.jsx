import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../services/api";
import { MovieCard } from "../MovieCard/MovieCard";
import { Button } from "../Button/Button";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice"; // Імпортуємо дії для Redux
import styles from "./MoviesList.module.css";

export const MoviesList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  // Отримуємо стан улюблених та переглянутих фільмів з Redux
  const { favorites, watched } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const isFetching = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current) return;
      isFetching.current = true;

      try {
        setLoading(true);
        const response = await getTrending(page);
        setMovies((prev) => [...prev, ...response.data.results]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };

    fetchData();
  }, [page]);

  const handleAddToFavorites = (movie) => {
    dispatch(toggleFavorite(movie)); // Відправляємо дію до Redux
  };

  const handleToggleWatched = (movie) => {
    dispatch(toggleWatched(movie)); // Відправляємо дію до Redux
  };

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {loading && <div className="spinner"></div>} {/* Спінер замість тексту */}
      {movies.length > 0 ? (
        <>
          <ul className={styles.movieList}>
            {movies.map((movie) => (
              <li key={movie.id} className={styles.movieItem}>
                <MovieCard
                  movie={movie}
                  onAddToFavorites={handleAddToFavorites}
                  isFavorite={favorites.some((m) => m.id === movie.id)}
                  isWatched={watched.some((m) => m.id === movie.id)}
                  onToggleWatched={handleToggleWatched}
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-center m-6">
            <Button title="Завантажити ще..." onClick={handleClick} />
          </div>
        </>
      ) : (
        <p>Наразі немає фільмів для показу.</p>
      )}
    </>
  );
};
