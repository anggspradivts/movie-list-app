import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import Navbar from './components/Navbar'
import MovieDetailPage from './pages/MovieDetail'
import { useEffect, useState } from 'react'
import { MovieProps } from './types/movie'
import { useToast } from "@/hooks/use-toast"


function App() {
  const [data, setData] = useState<MovieProps | null>(null);
  const { toast } = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/latest?page=1`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
          }
        });
        const data = await res.json();
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
        setData(data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  // console.log("dataa", data)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </>
  )
}

export default App
