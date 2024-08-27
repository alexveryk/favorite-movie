import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "cc9b731996eb433c4f02d82e82c7e11c";
const page = 1;

const options = {
  iso_639_1: "uk",
  english_name: "Ukrainian",
  name: "Український",
};

export const getTrending = async () => {
  const response = await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}&language=${options.iso_639_1}`
  );
  return response;
};
