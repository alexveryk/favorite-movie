import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_API_KEY;

const options = {
  iso_639_1: "uk",
  english_name: "Ukrainian",
  name: "Український",
};

export const getTrending = async (page) => {
  const response = await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}&language=${options.iso_639_1}`
  );
  return response;
};

export const getMovieDetails = async (movie_id) => {
  const response = await axios.get(
    `${BASE_URL}movie/${movie_id}?api_key=${API_KEY}&language=${options.iso_639_1}`
  );
  return response;
};

export const getMovieCredits = async (movie_id) => {
  const response = await axios.get(
    `${BASE_URL}movie/${movie_id}/credits?api_key=${API_KEY}&language=${options.iso_639_1}`
  );
  return response;
};

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=${
      options.iso_639_1
    }&query=${encodeURIComponent(query)}&page=${page}`
  );
  return response;
};

export const getMovieVideos = async (movie_id) => {
  const response = await axios.get(
    `${BASE_URL}movie/${movie_id}/videos?api_key=${API_KEY}&language=${options.iso_639_1}`
  );
  return response;
};

export const getSimilarMovies = async (movie_id) => {
  const response = await axios.get(
    `${BASE_URL}movie/${movie_id}/similar?api_key=${API_KEY}&language=${options.iso_639_1}`
  );
  return response;
};

// Serials

export const getTrendingSeries = async (page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}trending/tv/day?api_key=${API_KEY}&page=${page}&language=${options.iso_639_1}`
    );
    return response.data; // Повертаємо тільки необхідні дані
  } catch (error) {
    console.error("Error fetching trending series:", error);
    return { results: [] }; // Якщо сталася помилка, повертаємо порожній масив
  }
};

export const getSeriesDetails = async (series_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}tv/${series_id}?api_key=${API_KEY}&language=${options.iso_639_1}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching series details:", error);
    return null;
  }
};

export const getSeriesCredits = async (series_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}tv/${series_id}/credits?api_key=${API_KEY}&language=${options.iso_639_1}`
    );
    return response.data; // Повертаємо тільки необхідні дані
  } catch (error) {
    console.error("Error fetching series credits:", error);
    return null; // Якщо сталася помилка, повертаємо null
  }
};

export const searchSeries = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}search/tv?api_key=${API_KEY}&language=${
        options.iso_639_1
      }&query=${encodeURIComponent(query)}&page=${page}`
    );
    return response.data; // Повертаємо тільки необхідні дані
  } catch (error) {
    console.error("Error searching series:", error);
    return { results: [] }; // Якщо сталася помилка, повертаємо порожній масив
  }
};

export const getSeriesVideos = async (series_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}tv/${series_id}/videos?api_key=${API_KEY}&language=${options.iso_639_1}`
    );
    return response.data; // Повертаємо тільки необхідні дані
  } catch (error) {
    console.error("Error fetching series videos:", error);
    return { results: [] }; // Якщо сталася помилка, повертаємо порожній масив
  }
};

export const getSimilarSeries = async (series_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}tv/${series_id}/similar?api_key=${API_KEY}&language=${options.iso_639_1}`
    );
    return response.data; // Повертаємо тільки необхідні дані
  } catch (error) {
    console.error("Error fetching similar series:", error);
    return { results: [] }; // Якщо сталася помилка, повертаємо порожній масив
  }
};

export const getSeasonEpisodes = async (series_id, season_number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}tv/${series_id}/season/${season_number}?api_key=${API_KEY}&language=${options.iso_639_1}`
    );
    return response.data; // містить масив episode у полі .episodes
  } catch (error) {
    console.error("Error fetching season episodes:", error);
    return { episodes: [] };
  }
};
