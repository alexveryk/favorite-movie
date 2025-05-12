import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
} from "../../services/api";
import { toast } from "react-toastify";
import { truncatedText } from "../../utils/textUtils";

// import img from "../../../public/posterNotAvailable";

export const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.movies.favorites);
  const watched = useSelector((state) => state.movies.watched);
  const uid = useSelector((state) => state.user.uid);
  const [similarMovies, setSimilarMovies] = useState([]);

  const [movie, setMovie] = useState(null);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [videos, setVideos] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  const imgUrl = "/posterNotAvailable.png";

  useEffect(() => {
    setMovie(null);
    setCredits({ cast: [], crew: [] });
    setVideos([]);
    setShowTrailer(false);

    const fetchData = async () => {
      try {
        const [movieRes, creditsRes, videoRes] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
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

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const similarRes = await getSimilarMovies(id);
        setSimilarMovies(similarRes.data.results);
      } catch (error) {
        console.error("Помилка завантаження подібних фільмів:", error);
      }
    };
    fetchSimilarMovies();
  }, [id]);

  if (!movie) return <p className="text-center">Завантаження...</p>;

  const shareMovie = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Посилання скопійовано!");
  };

  const director = credits.crew.find((person) => person.job === "Director");
  const topCast = credits.cast
    .slice(0, 5)
    .map((actor) => actor.name)
    .join(", ");
  const genreList = movie.genres?.map((g) => g.name).join(", ");
  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const isFavorite =
    Array.isArray(favorites) && favorites.some((m) => m.id === movie.id);
  const isWatched =
    Array.isArray(watched) && watched.some((m) => m.id === movie.id);

  const handleFavoriteClick = () => {
    if (!uid) {
      toast.info("Увійдіть, щоб додати до улюбленого.");
      return;
    }
    dispatch(toggleFavorite({ movie, uid }));
  };

  const handleWatchedClick = () => {
    if (!uid) {
      toast.info("Увійдіть, щоб позначити як переглянуте.");
      return;
    }

    dispatch(toggleWatched({ movie, uid }));
  };

  return (
    <>
      {/* Movie card */}

      <div
        className="bg-cover bg-center text-white p-6"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.6)), 
      linear-gradient(to bottom, transparent, transparent 60%, #111 70%, #1a1a1a 90%, #000000 100%), 
      url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "imgUrl"
            }
            alt={movie.title}
            className="rounded-xl shadow-lg md:w-[320px] w-full max-w-[320px]"
          />

          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <p className="italic text-gray-300">{movie.original_title}</p>
            <p>
              <strong>Мова оригіналу:</strong>{" "}
              {movie.original_language.toUpperCase()}
            </p>
            <p>
              <strong>Рейтинг:</strong> {movie.vote_average} ({movie.vote_count}{" "}
              відгуків)
            </p>
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
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleFavoriteClick}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    isFavorite ? "bg-red-600 text-white" : "bg-white text-black"
                  }`}>
                  {isFavorite ? "Видалити з улюбленого" : "Додати в улюблене"}
                </button>
                <button
                  onClick={handleWatchedClick}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    isWatched ? "bg-blue-600 text-white" : "bg-white text-black"
                  }`}>
                  {isWatched
                    ? "Позначити як не переглянутий"
                    : "Позначити як переглянутий"}
                </button>
              </div>

              {trailer && (
                <div>
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold">
                    Подивитися трейлер
                  </button>
                </div>
              )}

              <div>
                <button
                  onClick={shareMovie}
                  className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold mb-2">
                  Поділитися
                </button>

                <p className="text-white font-semibold mb-1">Опис:</p>
                <p className="text-gray-200 leading-relaxed">
                  {movie.overview}
                </p>
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
      </div>

      <div
        className="py-10 px-6"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #000000, #1a1a1a, #2d2d2d, #434343, #595959, #707070, #808080, #9e9e9e, #b5b5b5, #c7c7c7, #d9d9d9, #e6e6e6, #f2f2f2, #f5f5f5, #fafafa, #ffffff, #f7f7f7, #f4f4f4, #f1f1f1, #e7e7e7, #e1e1e1, #d9d9d9, #d3d3d3, #cccccc, #c6c6c6, #bdbdbd, #b3b3b3, #a9a9a9, #9e9e9e, #929292, #868686, #7a7a7a, #6f6f6f, #636363, #595959, #4e4e4e, #434343, #393939, #2e2e2e, #232323, #191919, #0f0f0f",
        }}>
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-white">Подібні фільми:</h3>

          <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-800">
            {similarMovies.map((movie) => (
              <div key={movie.id} className="w-[150px] flex-shrink-0">
                <Link to={`/movies/${movie.id}`} className="block">
                  <img
                    loading="lazy"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "imgUrl"
                    }
                    alt={movie.title}
                    className="rounded-lg min-w-[150px] min-h-[225px] object-cover"
                  />

                  <p className="text-center text-sm text-white mt-1">
                    {truncatedText(movie.title, 16)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
