export const TrailerModal = ({ trailerKey, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-4 rounded-xl w-full max-w-3xl relative">
      <button
        className="absolute top-2 right-2 text-white text-2xl"
        onClick={onClose}>
        &times;
      </button>
      <iframe
        className="w-full aspect-video rounded"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="YouTube trailer"
        allowFullScreen
      />
    </div>
  </div>
);
