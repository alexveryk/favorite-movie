import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAll } from "../../services/api";
import { setSearchResults } from "../../store/searchSlice";
import { MovieCard } from "../MovieCard/MovieCard";
import { SeriesCard } from "../SeriesCard/SeriesCard";

export const SearchResults = ({ query }) => {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.search);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query?.trim()) return;
      const res = await searchAll(query);
      dispatch(setSearchResults(res));
    };
    fetchResults();
  }, [query, dispatch]);

  const filteredResults = results.filter((item) => {
    if (filter === "all") return true;
    return item.media_type === filter;
  });

  const getCardComponent = (item) => {
    if (item.media_type === "movie") return <MovieCard key={item.id} movie={item} />;
    if (item.media_type === "tv") return <SeriesCard key={item.id} series={item} />;
    return null;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#153d31] mb-4 pb-4">
        Результати для: <span className="italic">"{query}"</span>
      </h2>

   <div className="flex gap-3 mb-6">
  {[
    { label: "Усі", value: "all" },
    { label: "Фільми", value: "movie" },
    { label: "Серіали", value: "tv" },
  ].map(({ label, value }) => (
    <button
      key={value}
      onClick={() => setFilter(value)}
      className={`px-4 py-2 rounded-full border transition-all duration-200
        ${
          filter === value
            ? "bg-[#51cda6] text-white border-transparent"
            : "bg-white text-[#153d31] border-[#51cda6] hover:bg-[#e6f7f2]"
        }
      `}
    >
      {label}
    </button>
  ))}
</div>

      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredResults.map((item) => getCardComponent(item))}
        </div>
      ) : (
        <p className="text-gray-500">Нічого не знайдено у вибраній категорії.</p>
      )}
    </div>
  );
};
