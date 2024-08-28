import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { MoviesList } from "./components/MoviesList/MoviesList";

function App() {
  return (
    <>
      <Layout>
        <MoviesList />
      </Layout>
    </>
  );
}

export default App;
