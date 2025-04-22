import { createSlice } from "@reduxjs/toolkit";
import { updateUserFavorites, updateUserWatched } from "../firebase/firebase";

const initialState = {
  favorites: [],
  watched: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const { movie, uid } = action.payload;

      if (!movie || typeof movie.id === "undefined") return;

      state.favorites = [...state.favorites];

      const index = state.favorites.findIndex((m) => m?.id === movie.id);
      if (index === -1) {
        state.favorites.push(movie);
      } else {
        state.favorites.splice(index, 1);
      }

      if (uid) {
        updateUserFavorites(uid, state.favorites);
      }
    },

    toggleWatched: (state, action) => {
      const { movie, uid } = action.payload;

      if (!movie || typeof movie.id === "undefined") return;

      state.watched = [...state.watched];

      const index = state.watched.findIndex((m) => m?.id === movie.id);
      if (index === -1) {
        state.watched.push(movie);
      } else {
        state.watched.splice(index, 1);
      }

      if (uid) {
        updateUserWatched(uid, state.watched);
      }
    },

    setFavorites: (state, action) => {
      state.favorites = Array.isArray(action.payload)
        ? [...action.payload]
        : [];
    },

    setWatched: (state, action) => {
      state.watched = Array.isArray(action.payload) ? [...action.payload] : [];
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
  setFavorites,
  setWatched,
  clearMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
