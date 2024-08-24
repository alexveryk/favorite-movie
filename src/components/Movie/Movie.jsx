import "./style.css"

import { useState } from 'react';
import { useEffect } from 'react';
import { getTrending } from '../../services/api';

export const Movie = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setReviews] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTrending();
console.log(response.data.results)
        setReviews(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {movies.length > 0 ? (
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id}>

                <div class="movie-container">
                  <div class='img-thumb'>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}  alt="" />
                  </div>
                    <span>{movie.release_date}</span>
                    <span>{movie.title}</span>
                    <span>{movie.overview}</span>
                </div>


                {/* <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                <p>{movie.release_date}</p>
                <p>{movie.title}</p>
                <p>{movie.overview}</p> */}
                
                
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
};