import "./App.css";
import { Movie } from "./components/Movie/Movie";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Layout>
        <Movie />
      </Layout>
    </>
  );
}

export default App;
