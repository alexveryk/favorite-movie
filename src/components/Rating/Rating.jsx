import PropTypes from "prop-types";
import styles from "./Rating.module.css";

export const Rating = ({ rating, title }) => {
  const rounding = () => {
    const number = Math.round(rating * 100) / 100;
    return number;
  };

  return (
    <div className={styles.ratingCard}>
      <div title={`${title} голосів`}>{rounding(rating)}</div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.number.isRequired,
};
