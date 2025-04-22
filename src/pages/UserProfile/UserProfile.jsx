import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";
import { logoutUser } from "../../store/userSlice";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { Button } from "../../components/Button/Button";
import { MovieCount } from "../../components/MovieCount/MovieCount";
import { useNavigate } from "react-router-dom";
import style from "./UserProfile.module.css";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { favorites = [], watched = [] } = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
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
    dispatch(logoutUser());
    navigate("/");
  };

  const handleTabChange = (tab) => {
    localStorage.setItem("scrollPosition", window.scrollY);
    localStorage.setItem("activeTab", tab);
    setActiveTab(tab);
  };

  useEffect(() => {
    const savedPosition = localStorage.getItem("scrollPosition");
    const savedTab = localStorage.getItem("activeTab");
    if (savedPosition) {
      window.scrollTo({ top: parseInt(savedPosition), behavior: "smooth" });
      localStorage.removeItem("scrollPosition");
    }
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Завантаження профілю...</p>;
  }

  return (
    <div className="p-6">
      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-6 rounded-2xl shadow-md max-w-4xl mx-auto">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition">
          Вийти
        </button>
        <div className="w-28 h-28 rounded-full overflow-hidden border shadow-md">
          <img
            src={user.photoURL}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-[#153d31]">
            {user.displayName}
          </h2>
          <p className="text-gray-600 mt-1">{user.email}</p>
          <div className="mt-6 mb-6">
            <MovieCount count={favorites.length} label={"Улюблені"} />
            <MovieCount count={watched.length} label={"Переглянуті"} />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-10 mb-6 border-b border-[#153d31]">
        <Button
          title="Улюблені"
          active={activeTab === "favorites"}
          onClick={() => handleTabChange("favorites")}
        />
        <Button
          title="Переглянуті"
          active={activeTab === "watched"}
          onClick={() => handleTabChange("watched")}
        />
      </div>

      {moviesToShow.length > 0 ? (
        <ul className={`grid gap-6 ${style.responsiveGrid}`}>
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
