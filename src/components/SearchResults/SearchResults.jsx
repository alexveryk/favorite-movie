import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../../services/api";
import { setSearchResults } from "../../store/searchSlice";
import { MovieCard } from "../MovieCard/MovieCard";

export const SearchResults = ({ query }) => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query?.trim()) return;
      try {
        const res = await searchMovies(query);
        if (res.data?.results) {
          dispatch(setSearchResults({ results: res.data.results, query }));
        }
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchResults();
  }, [query, dispatch]);

  if (!query) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Результати для: "{query}"</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.length > 0 ? (
          results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-gray-500">Немає результатів для "{query}"</p>
        )}
      </div>
    </div>
  );
};
