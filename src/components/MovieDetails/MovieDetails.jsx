import { useEffect, useState } from "react";
import { getMovieDetails } from "../../services/api";
import styles from "./MovieDetails.module.css";

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
    <div>
      {loading && <div>Loading...</div>}
      <h1>{movieDetails.title}</h1>
      <div>{movieDetails.overview}</div>
    </div>
  );
};
