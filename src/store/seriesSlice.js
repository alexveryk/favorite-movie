// src/store/seriesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    favorites: [],
    watched: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const { series, uid } = action.payload;
      const isFavorite = state.favorites.some((s) => s.id === series.id);

      if (isFavorite) {
        state.favorites = state.favorites.filter((s) => s.id !== series.id);
      } else {
        state.favorites.push(series);
      }
    },
    toggleWatched: (state, action) => {
      const { series, uid } = action.payload;
      const isWatched = state.watched.some((s) => s.id === series.id);

      if (isWatched) {
        state.watched = state.watched.filter((s) => s.id !== series.id);
      } else {
        state.watched.push(series);
      }
    },
  },
});

export const { toggleFavorite, toggleWatched } = seriesSlice.actions;

export default seriesSlice.reducer;
