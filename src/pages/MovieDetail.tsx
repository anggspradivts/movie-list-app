import { MovieProps } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AnimeDetailPage = () => {
  const { movieId } = useParams();
  const fetchData = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    const data = await res.json();
    return data as MovieProps
  }

  const { data } = useQuery({
    queryKey: ["MOVIE", movieId],
    queryFn: fetchData,
  });

  console.log(data)
  
  return ( 
    <div>
      movieId : {movieId}
    </div>
   );
}
 
export default AnimeDetailPage;