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
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path})`,
      }}>
      {loading && <div>Loading...</div>}
      <div className={styles.movieCardContainer}>
        <MovieCard movie={movieDetails} />
      </div>
      {/* <h1>{movieDetails.title}</h1>
      <div>{movieDetails.overview}</div> */}
    </div>
  );
};
