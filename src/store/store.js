import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import userReducer from "./userSlice"; //
import searchReducer from "./searchSlice";
import seriesReducer from "../store/seriesSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    series: seriesReducer,
    user: userReducer,
    search: searchReducer,
  },
});

export default store;
