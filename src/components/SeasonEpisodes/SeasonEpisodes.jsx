// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setWatched } from "../../store/moviesSlice";
// import { getSeriesDetails, getSeasonEpisodes } from "../../services/api";

// import {
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";

// export const SeasonEpisodes = ({ seriesId }) => {
//   const dispatch = useDispatch();
//   const uid = useSelector((state) => state.user.uid);
//   const watchedEpisodes = useSelector(
//     (state) => state.movies.watchedEpisodes || {}
//   );
//   const [seasons, setSeasons] = useState([]);
//   const [open, setOpen] = useState(null);

//   useEffect(() => {
//     const fetchSeasonsAndEpisodes = async () => {
//       try {
//         const seriesDetails = await getSeriesDetails(seriesId);
//         if (!seriesDetails || !seriesDetails.seasons) return;

//         const seasonsData = await Promise.all(
//           seriesDetails.seasons.map(async (season) => {
//             const seasonDetails = await getSeasonEpisodes(
//               seriesId,
//               season.season_number
//             );
//             return {
//               ...season,
//               episodes: seasonDetails.episodes || [],
//             };
//           })
//         );

//         setSeasons(seasonsData);
//       } catch (err) {
//         console.error("Помилка завантаження сезонів та епізодів:", err);
//       }
//     };

//     fetchSeasonsAndEpisodes();
//   }, [seriesId]);

//   const handleEpisodeWatchedClick = (episodeId) => {
//     if (!uid) return alert("Увійдіть, щоб позначити як переглянуте.");
//     dispatch(setWatched({ episodeId, uid }));
//   };

//   const handleOpen = (value) => {
//     setOpen(open === value ? null : value);
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
//       {seasons.map((season, index) => (
//         <Accordion
//           key={season.id}
//           open={open === index}
//           className="rounded-xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300">
//           <AccordionHeader
//             onClick={() => handleOpen(index)}
//             className={`bg-gray-100 hover:bg-gray-200 px-6 py-4 transition-colors duration-300 ${
//               open === index ? "border-b border-gray-300" : ""
//             }`}>
//             <div className="flex items-center gap-4">
//               <div className="relative w-20 h-28 flex-shrink-0">
//                 {season.poster_path && (
//                   <img
//                     src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
//                     alt={`Постер сезону ${season.season_number}`}
//                     className="object-cover w-full h-full rounded-md shadow"
//                   />
//                 )}
//               </div>
//               <div>
//                 <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-gray-800">
//                      {season.name}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   {season.episode_count} епізодів
//                 </p>
//               </div>
//             </div>
//           </AccordionHeader>

//           <AccordionBody className="bg-white px-6 py-4">
//             <div className="flex flex-col gap-4 w-full">
//               {season.episodes?.map((ep) => {
//                 const formattedDate = ep.air_date
//                   ? new Date(ep.air_date).toLocaleDateString("uk-UA")
//                   : "Невідомо";

//                 return (
//                   <div
//                     key={ep.id}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-700">
//                       {/* Назва */}
//                       <div className="flex-1 font-medium truncate">
//                         {ep.name}
//                       </div>

//                       {/* Дата виходу */}
//                       <div className="text-center sm:w-1/3 text-gray-500">
//                         дата виходу: {formattedDate}
//                       </div>

//                       {/* Кнопка */}
//                       <div className="sm:w-auto">
//                         <button
//                           onClick={() => handleEpisodeWatchedClick(ep.id)}
//                           className={`px-4 py-1 rounded-full w-full sm:w-auto whitespace-nowrap transition-colors duration-200 ${
//                             watchedEpisodes[ep.id]
//                               ? "bg-green-500 text-white"
//                               : "bg-gray-300 text-gray-800"
//                           }`}>
//                           {watchedEpisodes[ep.id]
//                             ? "Переглянуто"
//                             : "Позначити як переглянуте"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </AccordionBody>
//         </Accordion>
//       ))}
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWatched } from "../../store/moviesSlice";
import { getSeriesDetails, getSeasonEpisodes } from "../../services/api";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export const SeasonEpisodes = ({ seriesId }) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const watchedEpisodes = useSelector(
    (state) => state.movies.watchedEpisodes || {}
  );
  const [seasons, setSeasons] = useState([]);
  const [open, setOpen] = useState(null);

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

  const handleEpisodeWatchedClick = (episodeId) => {
    if (!uid) return alert("Увійдіть, щоб позначити як переглянуте.");
    dispatch(setWatched({ episodeId, uid }));
  };

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
      {seasons.map((season, index) => (
        <Accordion
          key={season.id}
          open={open === index}
          className="rounded-xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300">
          <AccordionHeader
            onClick={() => handleOpen(index)}
            className={`bg-gray-100 hover:bg-gray-200 px-6 py-4 transition-colors duration-300 ${
              open === index ? "border-b border-gray-300" : ""
            }`}>
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
                <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-gray-800">
                  {season.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {season.episode_count} епізодів
                </p>
              </div>
            </div>
          </AccordionHeader>

          <AccordionBody className="bg-white px-6 py-4">
            <div className="flex flex-col gap-4 w-full">
              {season.episodes?.map((ep) => {
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-700">
                      {/* Назва з номером */}
                      <div className="flex-1 font-medium truncate">
                        Епізод {ep.episode_number}: {ep.name}
                      </div>

                      {/* Дата виходу */}
                      <div className="text-center sm:w-1/3 text-gray-500">
                        дата виходу: {formattedDate}
                      </div>

                      {/* Кнопка */}
                      <div className="sm:w-auto">
                        <button
                          onClick={() => handleEpisodeWatchedClick(ep.id)}
                          className={`px-4 py-1 rounded-full w-full sm:w-auto whitespace-nowrap transition-colors duration-200 ${
                            watchedEpisodes[ep.id]
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-800"
                          }`}>
                          {watchedEpisodes[ep.id]
                            ? "Переглянуто"
                            : "Позначити як переглянуте"}
                        </button>
                      </div>
                    </div>

                    {/* Нижній рядок: рейтинг, тривалість, опис */}
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <div className="flex flex-wrap gap-4">
                        <span>⏱ {duration}</span>
                        <span>⭐ {rating}</span>
                      </div>
                      {ep.overview && (
                        <p className="text-gray-500 line-clamp-3">
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
      ))}
    </div>
  );
};
