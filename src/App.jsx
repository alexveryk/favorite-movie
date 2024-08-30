import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { MovieDetails } from "./components/MovieDetails/MovieDetails";
import { MoviesList } from "./components/MoviesList/MoviesList";

function App() {
  return (
    <>
      <Layout>
        <MoviesList />
        <MovieDetails id={"1032823"} />
      </Layout>
    </>
  );
}

export default App;
