import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { SearchBar } from "../SearchBar/SearchBar";

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { uid, displayName, photoURL } = useSelector((state) => state.user);

  const styleNavLink = ({ isActive }) =>
    isActive
      ? "text-[#51cda6] font-semibold border-b-2 border-[#51cda6] text-xl p-4 transition-all"
      : "text-[#dde7cc] text-xl p-4 hover:text-[#153d31] hover:bg-[#dde7cc] transition-all";

  const ProfileBlock = () => (
    <div
      className="flex items-center gap-2 bg-blue-600 rounded-full px-3 py-1 cursor-pointer"
      onClick={() => {
        window.location.href = "/profile";
        setIsMenuOpen(false);
      }}>
      {photoURL && (
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
          <img
            src={photoURL}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <span className="text-white text-sm font-medium">{displayName}</span>
    </div>
  );

  return (
    <nav className="bg-[#153d31] rounded-lg">
      <div className="max-w-[1400px] w-full px-4">
        {/* Burger */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer py-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✖" : "☰"}
        </div>

        {/* Menu (desktop) */}
        <div className="hidden md:flex justify-between items-center flex-wrap">
          <div className="flex gap-4">
            <NavLink to="/" className={styleNavLink}>
              Головна
            </NavLink>
            <NavLink to="/movies" className={styleNavLink}>
              Фільми
            </NavLink>
            <NavLink to="/serials" className={styleNavLink}>
              Серіали
            </NavLink>
          </div>

          {/* Authorization */}
          <div className="flex items-center gap-4 pr-2">
            <SearchBar />
            {uid ? (
              <>
                <ProfileBlock />
                <LogoutButton />
              </>
            ) : (
              <GoogleLoginButton />
            )}
          </div>
        </div>

        {/* Menu (mobile version */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4">
            <NavLink
              to="/"
              className={styleNavLink}
              onClick={() => setIsMenuOpen(false)}>
              Головна
            </NavLink>
            <NavLink
              to="/movies"
              className={styleNavLink}
              onClick={() => setIsMenuOpen(false)}>
              Фільми
            </NavLink>
            <NavLink
              to="/serials"
              className={styleNavLink}
              onClick={() => setIsMenuOpen(false)}>
              Серіали
            </NavLink>
            <div className="px-4">
              <SearchBar onSearchDone={() => setIsMenuOpen(false)} />
            </div>
            {/* Authorization (mobile) */}
            <div className="flex flex-col items-center gap-3 mt-4 mb-4">
              {uid ? (
                <>
                  <ProfileBlock />
                  <LogoutButton />
                </>
              ) : (
                <GoogleLoginButton />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
