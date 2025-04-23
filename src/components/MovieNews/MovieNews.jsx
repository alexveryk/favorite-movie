import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

const API_KEY = "cc9b731996eb433c4f02d82e82c7e11c";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const tabs = [
  { key: "popular", label: "Новинки" },
  { key: "now_playing", label: "У кіно" },
  { key: "upcoming", label: "Очікувані" },
];

export const MovieNews = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/movie/${activeTab}?api_key=${API_KEY}&language=uk-UA&page=1`
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error("Помилка завантаження:", err);
      }
    };

    fetchMovies();
  }, [activeTab]);

  return (
    <section className="p-4 bg-gray-100 rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4">🎥 Актуальні фільми</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium transition",
              activeTab === tab.key
                ? "bg-black text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
            )}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {movies.slice(0, 8).map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                📅 {movie.release_date}
              </p>
              <p className="text-sm mt-2 line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
