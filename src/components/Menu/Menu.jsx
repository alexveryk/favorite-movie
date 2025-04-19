import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { uid, displayName, photoURL } = useSelector((state) => state.user);

  const styleNavLink = ({ isActive }) =>
    isActive
      ? "text-[#51cda6] font-semibold border-b-2 border-[#51cda6] text-2xl p-4 transition-all"
      : "text-[#dde7cc] text-2xl p-4 hover:text-[#153d31] hover:bg-[#dde7cc] transition-all";

  return (
    <nav className="bg-[#153d31] rounded-lg">
      <div className="max-w-[1400px] w-full px-4">
        {/* Бургер */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer py-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✖" : "☰"}
        </div>

        {/* Меню (десктоп) */}
        <div className="hidden md:flex justify-between items-center flex-wrap">
          <div className="flex gap-4">
            <NavLink to="/" className={styleNavLink}>
              Home
            </NavLink>
            <NavLink to="/movies" className={styleNavLink}>
              Movies
            </NavLink>
            <NavLink to="/serials" className={styleNavLink}>
              Serials
            </NavLink>
          </div>

          {/* Авторизація */}
          <div className="flex items-center gap-4 pr-2">
            {uid ? (
              <>
                {photoURL && (
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={photoURL}
                      alt="User Avatar"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => (window.location.href = "/profile")}
                    />
                  </div>
                )}
                <span
                  className="text-[#dde7cc] text-xs cursor-pointer"
                  onClick={() => (window.location.href = "/profile")}>
                  {displayName}
                </span>
                <LogoutButton />
              </>
            ) : (
              <GoogleLoginButton />
            )}
          </div>
        </div>

        {/* Меню (мобільна версія) */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4">
            <NavLink to="/" className={styleNavLink}>
              Home
            </NavLink>
            <NavLink to="/movies" className={styleNavLink}>
              Movies
            </NavLink>
            <NavLink to="/serials" className={styleNavLink}>
              Serials
            </NavLink>

            {/* Авторизація (мобільно) */}
            <div className="flex flex-col items-start gap-2 mt-2 px-2">
              {uid ? (
                <>
                  {photoURL && (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={photoURL}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        onClick={() => (window.location.href = "/profile")}
                      />
                    </div>
                  )}
                  <span
                    className="text-[#dde7cc] text-lg cursor-pointer"
                    onClick={() => (window.location.href = "/profile")}>
                    {displayName}
                  </span>
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
