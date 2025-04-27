export const WatchedLabel = () => {
  return (
    <div className="absolute top-2 left-2 flex items-center bg-green-500/90 text-white text-sm font-semibold px-2.5 py-1 rounded-lg animate-in fade-in duration-300 ease-in-out z-30 shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 mr-1.5 fill-white"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path d="M9 16.2l-3.5-3.6L4 14l5 5 12-12-1.4-1.4z" />
      </svg>
      Переглянуто
    </div>
  );
};
