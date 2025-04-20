import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";
import { MovieCard } from "../MovieCard/MovieCard";

export const ProfileMovieList = ({ movies, noMoviesMessage }) => {
  const dispatch = useDispatch();
  const { favorites = [], watched = [] } = useSelector((state) => state.movies);
  const uid = useSelector((state) => state.user.uid);

  // Нормалізуємо дані: якщо є вкладені масиви - розгортаємо
  const normalizedMovies = Array.isArray(movies)
    ? movies.flatMap((m) => (Array.isArray(m) ? m : [m]))
    : [];

  const handleAddToFavorites = (movie) => {
    if (!uid) {
      console.error("User is not logged in");
      return;
    }
    if (!movie?.id) return;
    dispatch(toggleFavorite({ movie, uid }));
  };

  const handleToggleWatched = (movie) => {
    if (!uid) {
      console.error("User is not logged in");
      return;
    }
    if (!movie?.id) return;
    dispatch(toggleWatched({ movie, uid }));
  };

  return (
    <div>
      {normalizedMovies.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {normalizedMovies.map((movie) => {
            const isFavorite = favorites.some((m) => m?.id === movie.id);
            const isWatched = watched.some((m) => m?.id === movie.id);
            // Перевіряємо наявність обов'язкових полів
            if (!movie?.title || !movie?.poster_path) return null;
            return (
              <li key={movie.id} className="bg-white rounded-2xl shadow-md p-2">
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
      ) : (
        <p className="text-center text-gray-500 mt-4">{noMoviesMessage}</p>
      )}
    </div>
  );
};
