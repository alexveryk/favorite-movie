import { useSelector } from "react-redux";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileMovieList } from "../../components/ProfileMovieList/ProfileMovieList";

export const UserProfile = () => {
  const { displayName, photoURL, email } = useSelector((state) => state.user);
  const { favorites, watched } = useSelector((state) => state.movies);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("favorites");

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <button onClick={handleBack} className="text-[#51cda6] text-xl mb-4">
        ← На головну
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

        <div className="flex gap-8 mb-6">
          <button
            onClick={() => setActiveTab("favorites")}
            className={`text-xl ${
              activeTab === "favorites"
                ? "text-[#51cda6] font-semibold"
                : "text-[#dde7cc]"
            }`}>
            Улюблені
          </button>
          <button
            onClick={() => setActiveTab("watched")}
            className={`text-xl ${
              activeTab === "watched"
                ? "text-[#51cda6] font-semibold"
                : "text-[#dde7cc]"
            }`}>
            Переглянуті
          </button>
        </div>

        {activeTab === "favorites" && (
          <ProfileMovieList
            movies={favorites}
            noMoviesMessage="У вас немає улюблених фільмів."
          />
        )}
        {activeTab === "watched" && (
          <ProfileMovieList
            movies={watched}
            noMoviesMessage="Ви ще не переглядали фільмів."
          />
        )}

        <LogoutButton />
      </div>
    </div>
  );
};
