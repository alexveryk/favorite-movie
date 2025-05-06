import { createSlice } from "@reduxjs/toolkit";

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    favorites: [],
    watched: [],
    watchedEpisodes: {},
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const { series } = action.payload;
      const isFavorite = state.favorites.some((s) => s.id === series.id);

      if (isFavorite) {
        state.favorites = state.favorites.filter((s) => s.id !== series.id);
      } else {
        state.favorites.push(series);
      }
    },

    toggleWatched: (state, action) => {
      const { series } = action.payload;
      const isWatched = state.watched.some((s) => s.id === series.id);

      if (isWatched) {
        state.watched = state.watched.filter((s) => s.id !== series.id);
      } else {
        state.watched.push(series);
      }
    },

    setWatched: (state, action) => {
      const { episodeId } = action.payload;
      state.watchedEpisodes[episodeId] = !state.watchedEpisodes[episodeId];
    },

    setAllWatchedEpisodes: (state, action) => {
      state.watchedEpisodes = action.payload;
    },
  },
});

export const {
  toggleFavorite,
  toggleWatched,
  setWatched,
  setAllWatchedEpisodes,
} = seriesSlice.actions;

export default seriesSlice.reducer;
