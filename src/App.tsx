import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Navbar2 from "./components/Navbar2";
import MovieDetailPage from "./pages/MovieDetail";
import { Toaster } from "@/components/ui/toaster";
import TvDetailsPage from "./pages/TvDetails";
import "@/styles/style.css"

function App() {

  return (
    <>
      <Navbar2 />
      <Toaster 
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="/movie/:tvId" element={<TvDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
