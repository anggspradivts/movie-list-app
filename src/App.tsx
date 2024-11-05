import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import MovieDetailPage from "./pages/MovieDetail";
import { MovieProps } from "./types/movie";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { toast } = useToast();

  async function fethData() {
    const res = await fetch("https://api.themoviedb.org/3/movie/latest", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    const data = await res.json();
    return data as MovieProps;
  }

  const { data } = useQuery({
    queryKey: ["MOVIE"],
    queryFn: () => fethData(),
  });

  return (
    <>
      <Navbar2 />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
