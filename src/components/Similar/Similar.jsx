import { Link } from "react-router-dom";
import { truncatedText } from "../../utils/textUtils";

const imgUrl = "/posterNotAvailable.png";

export const Similar = ({ similars }) => {
  if (!similars?.length) return null;

  return (
    <div className="py-10 px-6">
      <div className="max-w-6xl mx-auto p-4">
        <h3 className="text-xl font-bold mb-4 text-white">Подібне:</h3>
        <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-800">
          {similars.map((item) => {
            const isSeries = item.media_type === "tv" || item.name;
            const linkTo = isSeries ? `/series/${item.id}` : `/movies/${item.id}`;
            const title = item.title || item.name;

            return (
              <Link to={linkTo} key={item.id} className="block w-[150px] flex-shrink-0">
                <img
                  loading="lazy"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : imgUrl
                  }
                  alt={title}
                  className="rounded-lg min-w-[150px] min-h-[225px] object-cover"
                />
                <p className="text-center text-sm text-white mt-1">
                  {truncatedText(title, 16)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
