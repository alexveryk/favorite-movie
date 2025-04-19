// features/movies/moviesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  watched: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const index = state.favorites.findIndex((m) => m.id === movie.id);
      if (index === -1) {
        state.favorites.push(movie);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    toggleWatched: (state, action) => {
      const movie = action.payload;
      const index = state.watched.findIndex((m) => m.id === movie.id);
      if (index === -1) {
        state.watched.push(movie);
      } else {
        state.watched.splice(index, 1);
      }
    },
    addToFavorites: (state, action) => {
      const movie = action.payload;
      if (!state.favorites.some((m) => m.id === movie.id)) {
        state.favorites.push(movie);
      }
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setWatched: (state, action) => {
      state.watched = action.payload;
    },
    clearMovies: (state) => {
      state.favorites = [];
      state.watched = [];
    },
  },
});

export const {
  toggleFavorite,
  toggleWatched,
  addToFavorites,
  setFavorites,
  setWatched,
  clearMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
