import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setWatched,
  toggleFavorite,
  toggleWatched,
} from "../../store/moviesSlice";
import { toast } from "react-toastify";
import {
  getSeriesDetails,
  getSeriesCredits,
  getSeriesVideos,
  getSimilarSeries,
  getSeasonEpisodes,
} from "../../services/api";
import { truncatedText } from "../../utils/textUtils";
import { TrailerModal } from "../TrailerModal/TrailerModal";
import { SimilarSeriesList } from "../SimilarSeriesList/SimilarSeriesList";
import { SeasonEpisodes } from "../SeasonEpisodes/SeasonEpisodes";

const imgUrl = "/posterNotAvailable.png";

export const SeriesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const favorites = useSelector((state) => state.movies.favorites);
  const watched = useSelector((state) => state.movies.watched);

  const [series, setSeries] = useState(null);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [season, setSeason] = useState(null);
  //   const [watched, setWatched] = useState({});

  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    const fetchSeasonsAndEpisodes = async () => {
      try {
        const seriesData = await getSeriesDetails(id);
        setSeries(seriesData);
        const seasonsData = seriesData.seasons || [];
        setSeasons(seasonsData);

        const episodesData = {};
        for (const season of seasonsData) {
          const seasonEpisodes = await getSeasonEpisodes(
            id,
            season.season_number
          );
          episodesData[season.season_number] = seasonEpisodes.episodes || [];
        }
        setEpisodes(episodesData);
      } catch (err) {
        console.error("Помилка завантаження даних сезонів та серій:", err);
      }
    };
    fetchSeasonsAndEpisodes();
  }, [id]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const seriesData = await getSeriesDetails(id);
        setSeasons(seriesData.seasons || []); // отримуємо сезони
        fetchEpisodes(seriesData.seasons[0].id); // за замовчуванням завантажуємо перший сезон
      } catch (err) {
        console.error("Помилка завантаження даних сезону:", err);
      }
    };
    fetchSeasons();
  }, [id]);

  const fetchEpisodes = async (seasonId) => {
    try {
      const seasonData = await getSeasonEpisodes(id, seasonId);
      setEpisodes(seasonData.episodes || []);
    } catch (err) {
      console.error("Помилка завантаження серій:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [seriesRes, creditsRes, videoRes, similarRes] = await Promise.all(
          [
            getSeriesDetails(id),
            getSeriesCredits(id),
            getSeriesVideos(id),
            getSimilarSeries(id),
          ]
        );
        setSeries(seriesRes);
        setCredits(creditsRes);
        setVideos(videoRes.results || []);
        setSimilar(similarRes.results || []);

        // отримуємо серії лише першого сезону (наприклад)
        const episodesRes = await getSeasonEpisodes(id, 1);
        setEpisodes(episodesRes.episodes || []);
      } catch (err) {
        console.error("Помилка завантаження:", err);
      }
    };
    fetchData();
  }, [id]);

  const isFavorite = useMemo(
    () => favorites?.some((s) => s.id === +id),
    [favorites, id]
  );
  const isWatched = useMemo(
    () => watched?.some((s) => s.id === +id),
    [watched, id]
  );

  const handleFavoriteClick = () => {
    if (!uid) return toast.info("Увійдіть, щоб додати до улюбленого.");
    dispatch(toggleFavorite({ series, uid }));
  };

  const handleWatchedClick = () => {
    if (!uid) return toast.info("Увійдіть, щоб позначити як переглянуте.");
    dispatch(toggleWatched({ series, uid }));
  };

  const shareSeries = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Посилання скопійовано!");
  };

  const director = credits.crew.find((p) => p.job === "Director");
  const topCast = credits.cast
    .slice(0, 5)
    .map((a) => a.name)
    .join(", ");
  const genreList = series?.genres?.map((g) => g.name).join(", ");
  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  if (!series) return <p className="text-center text-white">Завантаження...</p>;

  return (
    <>
      <div
        className="bg-cover bg-center text-white p-6"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.6)), 
          linear-gradient(to bottom, transparent 60%, #111 90%, #000 100%), 
          url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
        }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          <img
            src={
              series.poster_path
                ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                : imgUrl
            }
            alt={series.name}
            className="rounded-xl shadow-lg md:w-[320px] w-full max-w-[320px]"
          />

          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">{series.name}</h1>
            <p className="italic text-gray-300">{series.original_name}</p>
            <p>
              <strong>Мова:</strong> {series.original_language.toUpperCase()}
            </p>
            <p>
              <strong>Рейтинг:</strong> {series.vote_average} (
              {series.vote_count} голосів)
            </p>
            <p>
              <strong>Жанри:</strong> {genreList}
            </p>
            <p>
              <strong>Рік:</strong> {series.first_air_date?.slice(0, 4)}
            </p>
            <p>
              <strong>Тривалість:</strong> {series.episode_run_time?.[0]} хв
            </p>
            <p>
              <strong>Актори:</strong> {topCast}
            </p>
            {director && (
              <p>
                <strong>Режисер:</strong> {director.name}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={handleFavoriteClick}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  isFavorite ? "bg-red-600 text-white" : "bg-white text-black"
                }`}>
                {isFavorite ? "У видаленому" : "У улюблене"}
              </button>
              <button
                onClick={handleWatchedClick}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  isWatched ? "bg-blue-600 text-white" : "bg-white text-black"
                }`}>
                {isWatched ? "Не переглянутий" : "Переглянутий"}
              </button>
              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold">
                  Подивитися трейлер
                </button>
              )}
              <button
                onClick={shareSeries}
                className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold">
                Поділитися
              </button>
            </div>

            <div>
              <p className="text-white font-semibold mt-4">Опис:</p>
              <p className="text-gray-200">
                {isOverviewExpanded
                  ? series.overview
                  : series.overview.slice(0, 200) +
                    (series.overview.length > 200 ? "..." : "")}
              </p>
              {series.overview.length > 200 && (
                <button
                  className="text-sm text-yellow-400 hover:underline mt-1"
                  onClick={() => setIsOverviewExpanded((prev) => !prev)}>
                  {isOverviewExpanded ? "Згорнути" : "Читати більше"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {trailer && showTrailer && (
        <TrailerModal
          trailerKey={trailer.key}
          onClose={() => setShowTrailer(false)}
        />
      )}

      <SimilarSeriesList similarSeries={similar} />
      <SeasonEpisodes
        seriesId={id}
        seasonNumber={selectedSeason}
        // posterPath={selectedSeasonPosterPath}
      />
    </>
  );
};
