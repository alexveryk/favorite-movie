import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: JSON.parse(localStorage.getItem("searchResults")) || [], // отримуємо збережені результати пошуку
    query: localStorage.getItem("searchQuery") || "", // отримуємо збережений запит
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.results = action.payload.results;
      state.query = action.payload.query;
      localStorage.setItem("searchResults", JSON.stringify(state.results)); // збереження результатів пошуку
      localStorage.setItem("searchQuery", state.query); // збереження пошукового запиту
    },
    clearSearchResults: (state) => {
      state.results = [];
      state.query = "";
      localStorage.removeItem("searchResults"); // очищення збережених результатів
      localStorage.removeItem("searchQuery"); // очищення збереженого запиту
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
