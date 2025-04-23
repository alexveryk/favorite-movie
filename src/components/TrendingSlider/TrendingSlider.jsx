import { useEffect, useState } from "react";
import { getTrending } from "../../services/api";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const TrendingSlider = () => {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTrending(1);
        setMovies(res.data.results);
      } catch (error) {
        console.error("Error loading trending movies:", error);
      }
    };

    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  if (movies.length === 0) return <div>Завантаження...</div>;

  return (
    <div className="relative w-full overflow-hidden h-[400px]">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-full relative">
            <img
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 w-full">
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <p className="text-sm mt-2 line-clamp-2">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl z-10">
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl z-10">
        &#10095;
      </button>
    </div>
  );
};
