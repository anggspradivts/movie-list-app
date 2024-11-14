import CarouselMovie from "@/components/movie-details/Carousel";
import MovieImageComponent from "@/components/movie-details/MovieImg";
import RecomendationSec from "@/components/movie-details/Recomendation";
import { MovieProps } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AnimeDetailPage = () => {
  const { movieId } = useParams();
  const fetchData = async () => {
    //get movie details by movieId
    const res1 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        },
      }
    );
    const movieDetails = await res1.json();

    //get movie recomendation by movieId
    const res2 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        },
      }
    );
    const movieRecomendations = await res2.json();

    const data = {
      ...movieDetails,
      movie_recomendation: movieRecomendations.results,
    };
    console.log(data);
    return data;
  };

  const { data } = useQuery({
    queryKey: ["MOVIE", movieId],
    queryFn: fetchData,
  });

  return (
    <div>
      <CarouselMovie data={data} />
      <MovieImageComponent movieId={movieId} />
      <RecomendationSec data={data} />
    </div>
  );
};

export default AnimeDetailPage;
