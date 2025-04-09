import styles from "./UnderConstruction.module.css";
export const UnderConstruction = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Сторінка в розробці</h1>
        <p className={styles.text}>
          Цей розділ ще готується. Ми активно працюємо над його створенням.
        </p>
        <p className={{ ...styles.text, marginTop: "8px" }}>
          Завітайте трохи згодом!
        </p>
      </div>
    </div>
  );
};
