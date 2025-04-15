export const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="px-6 py-3 text-base font-semibold text-[#dde7cc] bg-[#153d31] rounded-xl shadow-md hover:bg-[#1e4d3e] transition-colors duration-200 font-[Inter]">
      {title}
    </button>
  );
};
