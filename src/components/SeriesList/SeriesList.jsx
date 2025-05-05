import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingSeries } from "../../services/api.js";
import { SeriesCard } from "../SeriesCard/SeriesCard.jsx";
import { toggleFavorite, toggleWatched } from "../../store/moviesSlice";
import { ChevronUp } from "lucide-react";

export const SeriesList = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const dispatch = useDispatch();
  const isFetching = useRef(false);

  const { favorites = [], watched = [] } = useSelector((state) => state.movies);
  const uid = useSelector((state) => state.user.uid);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current) return;
      isFetching.current = true;

      try {
        setLoading(true);
        const response = await getTrendingSeries(page);

        if (response?.results) {
          setSeries((prev) => [...prev, ...response.results]);
        } else {
          console.error("No results found in the response:", response);
        }
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };

    fetchData();
  }, [page]);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      {loading && <div className="spinner"></div>}
      {series.length > 0 ? (
        <>
          {/* Основна сітка для серіалів */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 py-6">
            {series.map((show) => {
              const isFavorite = favorites?.some((s) => s?.id === show.id);
              const isWatched = watched?.some((s) => s?.id === show.id);

              return (
                <li key={show.id}>
                  <SeriesCard
                    series={show}
                    isFavorite={isFavorite}
                    isWatched={isWatched}
                    dispatch={dispatch}
                    uid={uid}
                  />
                </li>
              );
            })}
          </ul>

          {/* Кнопка для завантаження ще */}
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="block mx-auto mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
            Load More
          </button>
        </>
      ) : (
        <p className="text-center text-gray-600">No series to show.</p>
      )}

      {/* Кнопка скролу вгору */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600">
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};
