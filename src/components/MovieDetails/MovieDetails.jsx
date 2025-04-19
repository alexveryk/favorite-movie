import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice"; // Corrected import
import { getMovieDetails, getMovieCredits } from "../../services/api";
import axios from "axios";

export const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Accessing the favorites and watched arrays correctly from the Redux state
  const favorites = useSelector((state) => state.movies.favorites);
  const watched = useSelector((state) => state.movies.watched);

  const [movie, setMovie] = useState(null);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [videos, setVideos] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, creditsRes, videoRes] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=cc9b731996eb433c4f02d82e82c7e11c&language=uk`
          ),
        ]);

        setMovie(movieRes.data);
        setCredits(creditsRes.data);
        setVideos(videoRes.data.results);
      } catch (error) {
        console.error("Помилка завантаження даних фільму:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) return <p className="text-center">Завантаження...</p>;

  const director = credits.crew.find((person) => person.job === "Director");
  const topCast = credits.cast
    .slice(0, 5)
    .map((actor) => actor.name)
    .join(", ");
  const genreList = movie.genres?.map((g) => g.name).join(", ");
  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const isFavorite = (favorites || []).some((m) => m.id === movie.id);
  const isWatched = (watched || []).some((m) => m.id === movie.id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(movie));
  };

  const handleWatchedClick = () => {
    dispatch(toggleWatched(movie));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-6"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl shadow-lg md:w-[320px] w-full max-w-[320px]"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="italic text-gray-300">{movie.original_title}</p>
          <p>
            <strong>Жанри:</strong> {genreList}
          </p>
          <p>
            <strong>Рік:</strong> {movie.release_date.slice(0, 4)}
          </p>
          <p>
            <strong>Тривалість:</strong> {movie.runtime} хв
          </p>
          <p>
            <strong>Актори:</strong> {topCast}
          </p>
          <p>
            <strong>Режисер:</strong> {director?.name}
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleFavoriteClick}
              className={`px-4 py-2 rounded-lg font-semibold ${
                isFavorite ? "bg-red-600" : "bg-white text-black"
              }`}>
              {isFavorite ? "Видалити з улюбленого" : "Додати в улюблене"}
            </button>
            <button
              onClick={handleWatchedClick}
              className={`px-4 py-2 rounded-lg font-semibold ${
                isWatched ? "bg-blue-600" : "bg-white text-black"
              }`}>
              {isWatched
                ? "Позначити як не переглянутий"
                : "Позначити як переглянутий"}
            </button>
            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold">
                Подивитися трейлер
              </button>
            )}
            <div>
              <p className="text-white font-semibold mb-1">Опис:</p>
              <p className="text-gray-200 leading-relaxed">
                {isOverviewExpanded
                  ? movie.overview
                  : movie.overview.slice(0, 200) +
                    (movie.overview.length > 200 ? "..." : "")}
              </p>
              {movie.overview.length > 200 && (
                <button
                  className="text-sm text-yellow-400 mt-1 hover:underline"
                  onClick={() => setIsOverviewExpanded((prev) => !prev)}>
                  {isOverviewExpanded ? "Згорнути" : "Читати більше"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 rounded-xl w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setShowTrailer(false)}>
              &times;
            </button>
            <iframe
              className="w-full aspect-video rounded"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube trailer"
              allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
