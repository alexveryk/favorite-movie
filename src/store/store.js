// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import userReducer from "./userSlice"; //

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});

export default store;
