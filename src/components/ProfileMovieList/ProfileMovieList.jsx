import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";
import { MovieCard } from "../MovieCard/MovieCard";
import { Button } from "../Button/Button";
import { logout } from "../../store/userSlice";

export const ProfileMovieList = () => {
  const dispatch = useDispatch();
  const { favorites = [], watched = [] } = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user.user);
  const uid = user?.uid;

  const [activeTab, setActiveTab] = useState("favorites");

  const moviesToShow = activeTab === "favorites" ? favorites : watched;

  const handleAddToFavorites = (movie) => {
    if (!uid || !movie?.id) return;
    dispatch(toggleFavorite({ movie, uid }));
  };

  const handleToggleWatched = (movie) => {
    if (!uid || !movie?.id) return;
    dispatch(toggleWatched({ movie, uid }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null;

  return (
    <div className="p-6">
      {/* Top Profile Info */}
      <div className="relative flex items-center gap-6 bg-white p-6 rounded-2xl shadow-md max-w-4xl mx-auto">
        {/* Logout button in top right corner */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition">
          Вийти
        </button>

        {/* Avatar */}
        <img
          src={user.photoURL}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />

        {/* Info */}
        <div>
          <h2 className="text-2xl font-semibold">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Category buttons */}
      <div className="flex justify-center gap-4 mt-10 mb-6">
        <Button
          title="Улюблені"
          variant={activeTab === "favorites" ? "default" : "outline"}
          active={activeTab === "favorites"}
          onClick={() => setActiveTab("favorites")}
        />
        <Button
          title="Переглянуті"
          variant={activeTab === "watched" ? "default" : "outline"}
          active={activeTab === "watched"}
          onClick={() => setActiveTab("watched")}
        />
      </div>

      {/* Movie list */}
      {moviesToShow.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {moviesToShow.map((movie) => {
            const isFavorite = favorites.some((m) => m?.id === movie.id);
            const isWatched = watched.some((m) => m?.id === movie.id);

            if (!movie?.title || !movie?.poster_path) return null;

            return (
              <li key={movie.id}>
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
        <p className="text-center text-gray-500 mt-4">
          {activeTab === "favorites"
            ? "Немає улюблених фільмів"
            : "Немає переглянутих фільмів"}
        </p>
      )}
    </div>
  );
};
