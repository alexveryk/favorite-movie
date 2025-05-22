import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";
import { truncatedText } from "../../utils/textUtils";

import { Rating } from "../Rating/Rating.jsx";
import { WatchedLabel } from "../WatchedLabel/WatchedLabel.jsx";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { favorites, watched } = useSelector((state) => state.movies);
  const uid = useSelector((state) => state.user.uid);

  const isFavorite =
    Array.isArray(favorites) && favorites.some((m) => m.id === movie.id);
  const isWatched =
    Array.isArray(watched) && watched.some((m) => m.id === movie.id);

  const handleCardClick = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
    navigate(`/movies/${movie.id}`);
  };

  const handleFavoriteClick = (evt) => {
    evt.stopPropagation();

    if (!uid) {
      toast.info("Увійдіть, щоб додати до улюбленого.");
      return;
    }

    dispatch(toggleFavorite({ movie, uid }));
  };

  const handleWatchedClick = (evt) => {
    evt.stopPropagation();

    if (!uid) {
      toast.info("Увійдіть, щоб позначити як переглянуте.");
      return;
    }

    dispatch(toggleWatched({ movie, uid }));
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg max-w-[324px] mx-auto transition-transform duration-300 ease-in-out hover:scale-105">
      <div
        className="relative aspect-[3/4] cursor-pointer"
        onClick={handleCardClick}>
        {isWatched && <WatchedLabel />}
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover block"
        />

        <div className="absolute top-2 right-2 flex flex-col gap-1 z-20">
          <button
            className={`bg-none border-none p-1 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110 ${
              isFavorite ? "text-red-600" : "text-white"
            }`}
            onClick={handleFavoriteClick}
            aria-label="Додати до улюблених">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFavorite ? "red" : "none"}
              stroke="red"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>

          <button
            className={`bg-none border-none p-1 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110 ${
              isWatched ? "text-blue-600" : "text-white"
            }`}
            onClick={handleWatchedClick}
            aria-label="Позначити як переглянуте"
            title={
              isWatched
                ? "Позначено як переглянуте"
                : "Позначити як переглянуте"
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isWatched ? "#3b82f6" : "none"}
              stroke="#3b82f6"
              strokeWidth="2"
              className="w-6 h-6">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
              <path d="M12 15l3-3-3-3-3 3 3 3z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-gray-200 py-3 px-4 text-center">
        <Rating
          className="absolute top-2 left-2 z-10"
          rating={movie.vote_average}
          title={movie.title}
        />
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          {truncatedText(movie.title)}
        </h2>
        <p className="text-gray-600 font-bold">
          {movie.release_date.slice(0, 4)}
        </p>
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
    release_date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
