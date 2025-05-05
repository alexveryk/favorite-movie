import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../../services/api";
import { setSearchResults } from "../../store/searchSlice";

export const SearchBar = ({ onSearchDone }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await searchMovies(query);
      if (res.data?.results) {
        dispatch(setSearchResults({ results: res.data.results, query }));
        navigate(`/search?query=${encodeURIComponent(query)}`);
        if (onSearchDone) onSearchDone();
      }
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  const handleClear = () => {
    setQuery("");
    dispatch(setSearchResults({ results: [], query: "" }));
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex gap-2 items-center px-4 py-2 w-full md:w-96">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук фільмів..."
        className="bg-[#dde7cc] text-[#153d31] px-4 py-2 pr-10 rounded-full focus:outline-none w-full"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-24 text-[#153d31] hover:text-red-500 transition"
          aria-label="Очистити пошук">
          ✖
        </button>
      )}

      <button
        type="submit"
        className="bg-[#51cda6] text-white px-4 py-2 rounded-full hover:bg-[#3bb28f] transition-all">
        🔍
      </button>
    </form>
  );
};
