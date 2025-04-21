export const MovieCount = ({ count, label, isFavorites }) => {
  return (
    <div
      className={` text-center sm:text-left flex items-center justify-center sm:justify-start gap-2 ${
        isFavorites ? "flex-col sm:flex-row" : "flex-row"
      }`}>
      <p className="text-xl font-semibold text-[#153d31]">{label}</p>
      <p className="text-lg text-gray-600">{count} шт.</p>
    </div>
  );
};
