import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

export const Menu = () => {
  return (
    <nav>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <Link to="/movies" className={styles.link}>
        Movies
      </Link>
      <Link to="/serials" className={styles.link}>
        Serials
      </Link>
    </nav>
  );
};
