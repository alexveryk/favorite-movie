import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Movies } from "./pages/Movies/Movies";
import { Serials } from "./pages/Serials/Serials";

// import { MoviesList } from "./components/MoviesList/MoviesList";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/serials" element={<Serials />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
