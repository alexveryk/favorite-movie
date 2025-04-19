import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const MovieList = ({ movies, noMoviesMessage }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <div key={index} className="w-40 h-60 bg-[#dde7cc] rounded-md p-2">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <p className="text-center text-[#153d31]">{movie.title}</p>
          </div>
        ))
      ) : (
        <p className="text-[#153d31]">{noMoviesMessage}</p>
      )}
    </div>
  );
};

export const UserProfile = () => {
  const { displayName, photoURL, email } = useSelector((state) => state.user);
  const { favorites, watched } = useSelector((state) => state.movies); // отримуємо списки з Redux
  const navigate = useNavigate();

  // Стейт для керування активною вкладкою
  const [activeTab, setActiveTab] = useState("favorites");

  // Обробник для повернення на головну
  const handleBack = () => {
    navigate("/"); // Повертає на головну
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <button onClick={handleBack} className="text-[#51cda6] text-xl mb-4">
        ← Back to Home
      </button>

      <div className="flex flex-col items-center">
        {photoURL && (
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img
              src={photoURL}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl text-[#153d31]">{displayName}</h1>
        <p className="text-lg text-[#153d31] mb-4">{email}</p>

        {/* Вкладки для улюблених і переглянутих фільмів */}
        <div className="flex gap-8 mb-6">
          <button
            onClick={() => setActiveTab("favorites")}
            className={`text-xl ${
              activeTab === "favorites"
                ? "text-[#51cda6] font-semibold"
                : "text-[#dde7cc]"
            }`}>
            Улюблені фільми
          </button>
          <button
            onClick={() => setActiveTab("watched")}
            className={`text-xl ${
              activeTab === "watched"
                ? "text-[#51cda6] font-semibold"
                : "text-[#dde7cc]"
            }`}>
            Переглянуті фільми
          </button>
        </div>

        {/* Виведення фільмів в залежності від активної вкладки */}
        {activeTab === "favorites" && (
          <MovieList
            movies={favorites}
            noMoviesMessage="У вас немає улюблених фільмів."
          />
        )}

        {activeTab === "watched" && (
          <MovieList
            movies={watched}
            noMoviesMessage="Ви не переглядали фільми."
          />
        )}

        <LogoutButton />
      </div>
    </div>
  );
};
