import { NavLink } from "react-router-dom";
import { useState } from "react";

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const styleNavLink = ({ isActive }) =>
    isActive
      ? "text-[#1e4d3e] font-semibold border-b-2 border-[#1e4d3e] text-2xl p-4 transition-all"
      : "text-[#dde7cc] text-2xl p-4 hover:text-[#153d31] hover:bg-[#dde7cc] hover:border-b-2 hover:border-[#153d31] transition-all";

  return (
    <nav className="bg-[#153d31] rounded-lg">
      <div className="max-w-[1400px] w-full px-4">
        {/* Кнопка-бургер (тільки на <768px) */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer py-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✖" : "☰"}
        </div>

        {/* Меню на екранах ≥768px */}
        <div className="hidden md:flex gap-4">
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

        {/* Меню для мобільних пристроїв (<768px) */}
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
          </div>
        )}
      </div>
    </nav>
  );
};
