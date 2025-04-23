import PropTypes from "prop-types";
import { Menu } from "../Menu/Menu";
import styles from "./Layout.module.css";

export const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.layoutHeader}>
        <div className={styles.layoutContainer}>
          <Menu />
        </div>
      </header>

      <div className={styles.layoutContainer}>
        <div className={styles.layoutContent}>
          <aside className={styles.layoutSidebar}>Sidebar</aside>
          <main className={styles.layoutMain}>{children}</main>
        </div>
      </div>

      <footer className="sticky bottom-0 bg-gray-800 text-white p-4 text-center z-50">
        &copy; 2025 Filmial. Всі права захищено.
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
