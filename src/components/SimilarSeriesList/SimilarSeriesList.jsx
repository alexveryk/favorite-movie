import { Link } from "react-router-dom";
import { truncatedText } from "../../utils/textUtils";

const imgUrl = "/posterNotAvailable.png";

export const SimilarSeriesList = ({ similarSeries }) => {
  if (!similarSeries?.length) return null;

  return (
    <div className="py-10 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-bold mb-4 text-white">Подібні серіали:</h3>
        <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-800">
          {similarSeries.map((series) => (
            <Link
              to={`/series/${series.id}`}
              key={series.id}
              className="block w-[150px] flex-shrink-0">
              <img
                src={
                  series.poster_path
                    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                    : imgUrl
                }
                alt={series.name}
                className="rounded-lg min-w-[150px] min-h-[225px] object-cover"
              />
              <p className="text-center text-sm text-white mt-1">
                {truncatedText(series.name, 16)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
