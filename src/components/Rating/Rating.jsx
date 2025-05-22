import PropTypes from "prop-types";
import { Star, StarHalf, StarOff } from "lucide-react";

export const Rating = ({ rating, title }) => {
  const roundedRating = Math.round(rating * 10) / 10;
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div
      className="absolute bottom-2 right-2 w-min flex items-center gap-2 text-sm text-gray-800 border border-gray-300 rounded-lg px-2 py-1 shadow-sm bg-white"
      title={`Рейтинг фільму "${title}": ${roundedRating} з 10`}
      aria-label={`Рейтинг фільму ${title} — ${roundedRating} з 10`}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} fill="#facc15" stroke="#facc15" size={12} />
        ))}
        {halfStar && (
          <StarHalf key="half" fill="#facc15" stroke="#facc15" size={12} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} stroke="#d1d5db" size={12} />
        ))}
      </div>

      <div className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold ">
        {`${roundedRating}`}
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
