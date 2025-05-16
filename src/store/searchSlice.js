import { createSlice } from "@reduxjs/toolkit";

const storedData = JSON.parse(localStorage.getItem("searchData")) || {
  query: "",
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: storedData.query,
    results: storedData.results,
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.query = action.payload.query;
      state.results = action.payload.results || [];


      localStorage.setItem(
        "searchData",
        JSON.stringify({
          query: state.query,
          results: state.results,
        })
      );
    },
    clearSearchResults: (state) => {
      state.query = "";
      state.results = [];
      localStorage.removeItem("searchData");
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
