import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../services/api";
import { MovieCard } from "../MovieCard/MovieCard";
import { Button } from "../Button/Button";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";
import { ChevronUp } from "lucide-react";
import style from "./MoviesList.module.css";

export const MoviesList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const dispatch = useDispatch();
  const isFetching = useRef(false);
  const lastVisibleRef = useRef(null);

  const { favorites = [], watched = [] } = useSelector((state) => state.movies);
  const uid = useSelector((state) => state.user.uid);

  useEffect(() => {
    const savedPosition = localStorage.getItem("scrollPosition");
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedPosition), behavior: "smooth" });
        localStorage.removeItem("scrollPosition");
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (lastVisibleRef.current) {
      lastVisibleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [movies]);

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

  useEffect(() => {
    if (lastVisibleRef.current) {
      lastVisibleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [movies]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToFavorites = (movie) => {
    if (!uid) return console.error("User is not logged in");
    if (Array.isArray(movie))
      return console.error("Invalid movie: array", movie);

    dispatch(toggleFavorite({ movie, uid }));
  };

  const handleToggleWatched = (movie) => {
    if (!uid) return console.error("User is not logged in");
    if (Array.isArray(movie))
      return console.error("Invalid movie: array", movie);

    dispatch(toggleWatched({ movie, uid }));
  };

  const handleClick = () => {
    const listItems = document.querySelectorAll("li[data-movie-id]");
    for (let i = listItems.length - 1; i >= 0; i--) {
      const rect = listItems[i].getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        lastVisibleRef.current = listItems[i];
        break;
      }
    }

    setPage((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      {loading && <div className="spinner"></div>}
      {movies.length > 0 ? (
        <>
          <ul className={`${style.responsiveGrid} gap-6`}>
            {movies.map((movie) => {
              const isFavorite = favorites?.some((m) => m?.id === movie.id);
              const isWatched = watched?.some((m) => m?.id === movie.id);

              return (
                <li key={movie.id} data-movie-id={movie.id}>
                  <MovieCard
                    movie={movie}
                    onAddToFavorites={handleAddToFavorites}
                    onToggleWatched={handleToggleWatched}
                    isFavorite={isFavorite}
                    isWatched={isWatched}
                  />
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center m-6">
            <Button title="Завантажити ще..." onClick={handleClick} />
          </div>
        </>
      ) : (
        <p>Наразі немає фільмів для показу.</p>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
          aria-label="Прокрутити вгору">
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};
