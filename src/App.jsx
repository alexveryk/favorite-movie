import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Movies } from "./pages/Movies/Movies";
import { Serials } from "./pages/Serials/Serials";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/serials" element={<Serials />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
