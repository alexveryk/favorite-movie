import styles from "./MoviesList.module.css";

import { Button } from "../Button/Button";

import { useRef, useState } from "react";
import { useEffect } from "react";
import { getTrending } from "../../services/api";
import { MovieCard } from "../MovieCard/MovieCard";

// export const MoviesList = () => {
//   const [loading, setLoading] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [page, setpage] = useState(1);
//   const isFetching = useRef(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (isFetching.current) return; // 👈 блокуємо подвійний виклик
//       isFetching.current = true;

//       try {
//         console.log("fetchData called");
//         setLoading(true);
//         const response = await getTrending(page);
//         console.log(response.data.results);
//         setMovies((prev) => [...prev, ...response.data.results]);
//         console.log(movies);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//         isFetching.current = false;
//       }
//     };
//     fetchData();
//   }, [page]);

//   const handleClick = (evt) => {
//     evt.preventDefault();
//     setpage((prev) => prev + 1);
//     console.log("Button");
//   };

//   return (
//     <>
//       {loading && <p>Loading...</p>}

//       {movies.length > 0 ? (
//         <>
//           {" "}
//           <ul className={styles.movieList}>
//             {movies.map((movie) => {
//               return (
//                 <li className={styles.movieItem} key={movie.id}>
//                   <MovieCard movie={movie} />
//                 </li>
//               );
//             })}
//           </ul>
//           <div className="flex justify-center m-6 shadow-gray-950">
//             <Button title="Завантажити ще..." onClick={handleClick} />
//           </div>
//         </>
//       ) : (
//         <p>We don&apos;t have any reviews for this movie</p>
//       )}
//     </>
//   );
// };

export const MoviesList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const isFetching = useRef(false);

  const handleAddToFavorites = (movie) => {
    const existing = [...favorites];
    const exists = existing.some((m) => m.id === movie.id);

    let updated;
    if (exists) {
      // Видаляємо з улюблених
      updated = existing.filter((m) => m.id !== movie.id);
    } else {
      // Додаємо до улюблених
      updated = [...existing, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated); // Оновлюємо стейт
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current) return;
      isFetching.current = true;

      try {
        setLoading(true);
        const response = await getTrending(page);
        setMovies((prev) => [...prev, ...response.data.results]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };
    fetchData();
  }, [page]);

  const handleClick = (evt) => {
    evt.preventDefault();
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {movies.length > 0 ? (
        <>
          <ul className={styles.movieList}>
            {movies.map((movie) => (
              <li className={styles.movieItem} key={movie.id}>
                <MovieCard
                  movie={movie}
                  onAddToFavorites={handleAddToFavorites}
                  isFavorite={favorites.some((m) => m.id === movie.id)} // передаємо прапор в MovieCard
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-center m-6 shadow-gray-950">
            <Button title="Завантажити ще..." onClick={handleClick} />
          </div>
        </>
      ) : (
        <p>Наразі немає відгуків на цей фільм.</p>
      )}
    </>
  );
};
