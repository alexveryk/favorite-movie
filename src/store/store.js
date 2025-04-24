// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import userReducer from "./userSlice"; //
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    search: searchReducer,
  },
});

export default store;
