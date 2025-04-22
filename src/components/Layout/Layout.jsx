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

      <footer className={styles.layoutFooter}>
        <div className={styles.layoutContainer}>Footer</div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
