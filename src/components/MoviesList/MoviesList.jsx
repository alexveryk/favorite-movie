// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTrending } from "../../services/api";
// import { MovieCard } from "../MovieCard/MovieCard";
// import { Button } from "../Button/Button";
// import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";
// import styles from "./MoviesList.module.css";

// export const MoviesList = () => {
//   const [loading, setLoading] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);

//   const dispatch = useDispatch();
//   const isFetching = useRef(false);

//   const { favorites = [], watched = [] } = useSelector((state) => state.movies);
//   const { uid } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (isFetching.current) return;
//       isFetching.current = true;

//       try {
//         setLoading(true);
//         const response = await getTrending(page);
//         setMovies((prev) => [...prev, ...response.data.results]);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       } finally {
//         setLoading(false);
//         isFetching.current = false;
//       }
//     };

//     fetchData();
//   }, [page]);

//   const handleAddToFavorites = (movie) => {
//     if (!uid) {
//       console.error("User is not logged in");
//       return;
//     }
//     dispatch(toggleFavorite({ movie, uid }));
//   };

//   const handleToggleWatched = (movie) => {
//     if (!uid) {
//       console.error("User is not logged in");
//       return;
//     }
//     dispatch(toggleWatched({ movie, uid }));
//   };

//   const handleClick = () => {
//     setPage((prev) => prev + 1);
//   };

//   return (
//     <>
//       {loading && <div className="spinner"></div>}
//       {movies.length > 0 ? (
//         <>
//           <ul className={styles.movieList}>
//             {movies.map((movie) => {
//               const isFavorite = favorites?.some((m) => m?.id === movie.id);
//               const isWatched = watched?.some((m) => m?.id === movie.id);

//               return (
//                 <li key={movie.id} className={styles.movieItem}>
//                   <MovieCard
//                     movie={movie}
//                     onAddToFavorites={handleAddToFavorites}
//                     onToggleWatched={handleToggleWatched}
//                     isFavorite={isFavorite}
//                     isWatched={isWatched}
//                   />
//                 </li>
//               );
//             })}
//           </ul>
//           <div className="flex justify-center m-6">
//             <Button title="Завантажити ще..." onClick={handleClick} />
//           </div>
//         </>
//       ) : (
//         <p>Наразі немає фільмів для показу.</p>
//       )}
//     </>
//   );
// };

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../services/api";
import { MovieCard } from "../MovieCard/MovieCard";
import { Button } from "../Button/Button";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";
import styles from "./MoviesList.module.css";

export const MoviesList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const isFetching = useRef(false);

  const { favorites = [], watched = [] } = useSelector((state) => state.movies);
  const uid = useSelector((state) => state.user.uid);

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

  const handleAddToFavorites = (movie) => {
    if (!uid) {
      console.error("User is not logged in");
      return;
    }

    if (Array.isArray(movie)) {
      console.error(
        "Invalid movie: received an array instead of object",
        movie
      );
      return;
    }

    dispatch(toggleFavorite({ movie, uid }));
  };

  const handleToggleWatched = (movie) => {
    if (!uid) {
      console.error("User is not logged in");
      return;
    }

    if (Array.isArray(movie)) {
      console.error(
        "Invalid movie: received an array instead of object",
        movie
      );
      return;
    }

    dispatch(toggleWatched({ movie, uid }));
  };

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {loading && <div className="spinner"></div>}
      {movies.length > 0 ? (
        <>
          <ul className={styles.movieList}>
            {movies.map((movie) => {
              const isFavorite = favorites?.some((m) => m?.id === movie.id);
              const isWatched = watched?.some((m) => m?.id === movie.id);

              return (
                <li key={movie.id} className={styles.movieItem}>
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
    </>
  );
};
