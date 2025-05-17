import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6 pb-6">Сторінку не знайдено</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Повернутись на головну
      </Link>
    </div>
  );
};
