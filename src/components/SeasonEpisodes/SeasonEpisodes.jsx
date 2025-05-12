import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWatched } from "../../store/seriesSlice";
import { getSeriesDetails, getSeasonEpisodes } from "../../services/api";
import { updateWatchedEpisodes } from "../../utils/firebaseUserData.js";
import { setAllWatchedEpisodes } from "../../store/seriesSlice";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase/firebase";

export const SeasonEpisodes = ({ seriesId }) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const watchedEpisodes = useSelector(
    (state) => state.series.watchedEpisodes || {}
  );
  const [seasons, setSeasons] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const watchedRef = ref(database, `users/${uid}/watchedEpisodes`);
    const unsubscribe = onValue(watchedRef, (snapshot) => {
      const data = snapshot.val() || {};
      dispatch(setAllWatchedEpisodes(data));
    });

    return () => unsubscribe();
  }, [uid]);

  useEffect(() => {
    const fetchSeasonsAndEpisodes = async () => {
      try {
        const seriesDetails = await getSeriesDetails(seriesId);
        if (!seriesDetails || !seriesDetails.seasons) return;

        const seasonsData = await Promise.all(
          seriesDetails.seasons.map(async (season) => {
            const seasonDetails = await getSeasonEpisodes(
              seriesId,
              season.season_number
            );
            return {
              ...season,
              episodes: seasonDetails.episodes || [],
            };
          })
        );

        setSeasons(seasonsData);
      } catch (err) {
        console.error("Помилка завантаження сезонів та епізодів:", err);
      }
    };

    fetchSeasonsAndEpisodes();
  }, [seriesId]);

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  const handleEpisodeWatchedClick = async (episodeId) => {
    if (!uid) return alert("Увійдіть, щоб позначити як переглянуте.");

    const newStatus = !watchedEpisodes[episodeId];
    const updatedWatchedEpisodes = {
      ...watchedEpisodes,
      [episodeId]: newStatus,
    };

    dispatch(setWatched({ episodeId, uid }));
    try {
      await updateWatchedEpisodes(uid, updatedWatchedEpisodes); // Замінив тут
    } catch (err) {
      console.error("Помилка оновлення переглянутих епізодів:", err);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-black text-white p-6">
      {seasons.map((season, index) => {
        const total = season.episodes.length;
        const watched = season.episodes.filter(
          (ep) => watchedEpisodes[ep.id]
        ).length;
        const allWatched = total > 0 && watched === total;

        return (
          <Accordion
            key={season.id}
            open={open === index}
            className="rounded-xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 mb-4">
            <AccordionHeader
              onClick={() => handleOpen(index)}
              className={`bg-gray-800 hover:bg-gray-700 px-6 py-4 transition-colors duration-300 ${
                open === index ? "border-b border-gray-300" : ""
              }`}>
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-28 flex-shrink-0">
                    {season.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                        alt={`Постер сезону ${season.season_number}`}
                        className="object-cover w-full h-full rounded-md shadow"
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-white">
                      {season.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {season.episode_count} епізодів
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-2">
                  {season.episodes.map((ep) => (
                    <div
                      key={ep.id}
                      className={`h-2 flex-1 rounded-full ${
                        watchedEpisodes[ep.id] ? "bg-green-500" : "bg-gray-300"
                      }`}></div>
                  ))}
                </div>

                {allWatched && (
                  <p className="text-sm text-green-600 font-medium">
                    ✅ Усі епізоди сезону переглянуто
                  </p>
                )}
              </div>
            </AccordionHeader>

            <AccordionBody className="bg-black text-white px-6 py-4">
              <div className="flex flex-col gap-4 w-full">
                {season.episodes?.map((ep) => {
                  const isFuture =
                    ep.air_date && new Date(ep.air_date) > new Date();
                  const formattedDate = ep.air_date
                    ? new Date(ep.air_date).toLocaleDateString("uk-UA")
                    : "Невідомо";
                  const duration = ep.runtime
                    ? `${ep.runtime} хв`
                    : "Тривалість невідома";
                  const rating = ep.vote_average?.toFixed(1) || "—";

                  return (
                    <div
                      key={ep.id}
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg shadow-sm hover:bg-gray-800 transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-300">
                        <div className="flex-1 font-medium truncate">
                          Епізод {ep.episode_number}: {ep.name}
                        </div>
                        <div className="text-center sm:w-1/3 text-gray-500">
                          дата виходу: {formattedDate}
                        </div>
                        <div className="sm:w-auto">
                          {/* <button
                              onClick={() => handleEpisodeWatchedClick(ep.id)}
                              className={`px-4 py-1 rounded-full w-full sm:w-auto whitespace-nowrap transition-colors duration-200 ${
                                watchedEpisodes[ep.id]
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-800"
                              }`}>
                              {watchedEpisodes[ep.id]
                                ? "Переглянуто"
                                : "Позначити як переглянуте"}
                            </button> */}
                          <button
                            onClick={() => {
                              if (!isFuture) handleEpisodeWatchedClick(ep.id);
                            }}
                            disabled={isFuture}
                            className={`px-4 py-1 rounded-full w-full sm:w-auto whitespace-nowrap transition-colors duration-200 ${
                              isFuture
                                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                : watchedEpisodes[ep.id]
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-gray-800"
                            }`}>
                            {isFuture
                              ? "Очікується"
                              : watchedEpisodes[ep.id]
                              ? "Переглянуто"
                              : "Позначити як переглянуте"}
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 space-y-1">
                        <div className="flex flex-wrap gap-4">
                          <span>⏱ {duration}</span>
                          <span>⭐ {rating}</span>
                        </div>
                        {ep.overview && (
                          <p className="text-gray-400 line-clamp-3">
                            {ep.overview}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>
        );
      })}
    </div>
  );
};
