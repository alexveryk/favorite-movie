import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../../services/api";
import { setSearchResults } from "../../store/searchSlice";

export const SearchBar = ({ onSearchDone }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await searchMovies(query);
      if (res.data && res.data.results) {
        dispatch(setSearchResults({ results: res.data.results, query }));
        setQuery(""); // очищення поля після успішного пошуку
        if (onSearchDone) onSearchDone(); // Закриє меню на мобілках
      } else {
        // можна додати повідомлення про помилку, якщо немає результатів
        console.error("No results found for the query");
      }
    } catch (error) {
      console.error("Error fetching search results: ", error);
      // Можна додати відображення повідомлення про помилку для користувача
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center px-4 py-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук фільмів..."
        className="bg-[#dde7cc] text-[#153d31] px-4 py-2 rounded-full focus:outline-none w-full md:w-72"
      />
      <button
        type="submit"
        className="bg-[#51cda6] text-white px-4 py-2 rounded-full hover:bg-[#3bb28f] transition-all">
        🔍
      </button>
    </form>
  );
};
