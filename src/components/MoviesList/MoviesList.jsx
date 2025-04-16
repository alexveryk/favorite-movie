import { useEffect, useRef, useState } from "react";
import { getTrending } from "../../services/api";
import { MovieCard } from "../MovieCard/MovieCard";
import { Button } from "../Button/Button";
import styles from "./MoviesList.module.css";

export const MoviesList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [watched, setWatched] = useState(
    JSON.parse(localStorage.getItem("watched")) || []
  );

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
    const exists = favorites.some((m) => m.id === movie.id);
    const updated = exists
      ? favorites.filter((m) => m.id !== movie.id)
      : [...favorites, movie];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  const handleToggleWatched = (movie) => {
    const exists = watched.some((m) => m.id === movie.id);
    const updated = exists
      ? watched.filter((m) => m.id !== movie.id)
      : [...watched, movie];

    localStorage.setItem("watched", JSON.stringify(updated));
    setWatched(updated);
  };

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {loading && <p>Завантаження...</p>}
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
