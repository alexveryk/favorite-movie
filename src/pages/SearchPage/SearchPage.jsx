import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchResults } from "../../components/SearchResults/SearchResults.jsx";

export const SearchPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get("query");

  useEffect(() => {
    if (!query?.trim()) {
      navigate("/");
    }
  }, [query, navigate]);

  return (
    <div>
      <SearchResults query={query} />
    </div>
  );
};
