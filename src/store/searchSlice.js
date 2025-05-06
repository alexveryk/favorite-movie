import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: JSON.parse(localStorage.getItem("searchResults")) || [],
    query: localStorage.getItem("searchQuery") || "",
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.results = action.payload.results;
      state.query = action.payload.query;
      localStorage.setItem("searchResults", JSON.stringify(state.results));
      localStorage.setItem("searchQuery", state.query);
    },
    clearSearchResults: (state) => {
      state.results = [];
      state.query = "";
      localStorage.removeItem("searchResults");
      localStorage.removeItem("searchQuery");
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
