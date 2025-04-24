import { useSelector } from "react-redux";
import { MovieCard } from "../MovieCard/MovieCard";

const SearchResults = () => {
  const { results, query } = useSelector((state) => state.search);

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

export default SearchResults;
