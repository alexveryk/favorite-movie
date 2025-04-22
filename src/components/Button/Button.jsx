import PropTypes from "prop-types";
import clsx from "clsx";

export const Button = ({ title, onClick, active = false }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        "px-6 py-2 text-base font-medium transition-all duration-200 font-[Inter]",
        "rounded-t-xl border-b-2",
        active
          ? "bg-white text-[#153d31] border-[#153d31] shadow-md"
          : "bg-[#e5ece7] text-gray-500 border-transparent hover:text-[#153d31]"
      )}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
};
