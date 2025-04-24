// import { UnderConstruction } from "../../components/UnderConstruction/UnderConstruction";

import { MovieNews } from "../../components/MovieNews/MovieNews";
import SearchResults from "../../components/SearchResults/SearchResults";
import { TrendingSlider } from "../../components/TrendingSlider/TrendingSlider";

export const Home = () => {
  return (
    <>
      {/* <UnderConstruction /> */}
      <div className="max-w-[1400px] mx-auto">
        <TrendingSlider />
        <SearchResults />
        <MovieNews />
      </div>
    </>
  );
};
