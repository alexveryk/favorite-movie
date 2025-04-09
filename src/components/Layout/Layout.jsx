import { Menu } from "../Menu/Menu";
import styles from "./Layout.module.css";

export const Layout = ({ children }) => {
  console.log(children);
  return (
    <div className={styles.layout}>
      <header className={styles.layoutHeader}>
        <Menu />
      </header>
      <div className={styles.layoutContent}>
        <aside className={styles.layoutSidebar}>Sidebar</aside>
        <main className={styles.layoutMain}>{children}</main>
      </div>
      <footer className={styles.layoutFooter}>Footer</footer>
    </div>
  );
};
