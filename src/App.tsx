import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Navbar2 from "./components/Navbar2";
import MovieDetailPage from "./pages/MovieDetail";
import { Toaster } from "@/components/ui/toaster";

function App() {

  return (
    <>
      <Navbar2 />
      <Toaster 
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
