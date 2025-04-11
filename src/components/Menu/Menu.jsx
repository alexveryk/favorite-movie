import { NavLink } from "react-router-dom";

export const Menu = () => {
  const styleNawlink = ({ isActive }) =>
    isActive
      ? "text-blue-500 font-semibold border-blue-500 text-2xl p-4"
      : "text-gray-500 text-2xl p-4";
  return (
    <nav>
      <NavLink to="/" className={styleNawlink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={styleNawlink}>
        Movies
      </NavLink>
      <NavLink to="/serials" className={styleNawlink}>
        Serials
      </NavLink>
    </nav>
  );
};
