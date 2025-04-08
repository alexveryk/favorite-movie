import { useEffect, useState } from "react";
import { getMovieDetails } from "../../services/api";
import styles from "./MovieDetails.module.css";
import { MovieCard } from "../MovieCard/MovieCard";

export const MovieDetails = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMovieDetails(id);
        console.log("Film", response.data);
        setMovieDetails(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div
      className={styles.movieDetailsContainer}
      style={{
        background: `
    linear-gradient(
      to bottom, 
      rgba(4, 5, 10, 0.4) 0%,  /* Прозорий чорний на початку */
      rgba(4, 5, 10, 0.5) 20%, /* Темніший на 40% висоти */
      rgba(4, 5, 10, 0.6) 30%, /* Ще темніший на 70% */
      rgba(4, 5, 10, 0.7) 50%  /* Повністю чорний внизу */
      rgba(4, 5, 10, 0.8) 70%,  /* Прозорий чорний на початку */
      rgba(4, 5, 10, 0.9) 90%, /* Темніший на 40% висоти */
      rgba(4, 5, 10, 1) 100%  /* Повністю чорний внизу */
    
    ),
    url(https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}) no-repeat center center / cover
  `,
      }}>
      {loading && <div>Loading...</div>}
      <div className={styles.movieCardContainer}>
        <MovieCard movie={movieDetails} />
      </div>
      {/* <h1>{movieDetails.title}</h1> */}
      {/* <div>{movieDetails.overview}</div> */}
    </div>
  );
};
