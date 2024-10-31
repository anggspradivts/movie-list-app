import { MovieProps } from "@/types/movie";
import { useEffect, useState } from "react";

interface HomePageProps {
  data: MovieProps | null
}
const HomePage = ({ data }: HomePageProps) => {
  const [topRateMovie, setTopRateMovie] = useState<MovieProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
          }
        });
        const data = await res.json();
        // console.log(data);
        // setTopRateMovie(data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-between">
      <div className="carousel">

      </div>
    </div>
   );
}
 
export default HomePage;