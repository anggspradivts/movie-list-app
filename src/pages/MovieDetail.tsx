import CarouselMovie from "@/components/movie-details/Carousel";
import MovieCreditsComponent from "@/components/movie-details/MovieCredits";
import MovieImageComponent from "@/components/movie-details/MovieImg";
import RecomendationSec from "@/components/movie-details/Recomendation";
import { MovieCredits } from "@/types/movie-credits";
import { MovieDetailsProps } from "@/types/movie-details";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchMovieDetails = async (movieId: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
};

const fetchMovieRecommendations = async (movieId: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch movie recommendations");
  return res.json();
};

const fetchMovieCredits = async (movieId: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch movie credits");
  return res.json();
};

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  

  const { data: movieDetails, isLoading: isLoadingDetails, isError: isErrorDetails } = useQuery<MovieDetailsProps>({
    queryKey: ["MOVIE_DETAILS", movieId],
    queryFn: () => fetchMovieDetails(movieId!),
    enabled: !!movieId,
  });

  const { data: movieRecomendations } = useQuery<{ results: MovieDetailsProps[] }>({
    queryKey: ["MOVIE_RECOMENDATION", movieId],
    queryFn: () => fetchMovieRecommendations(movieId!),
    enabled: !!movieId
  });

  const { data: movieCredits } = useQuery<MovieCredits>({
    queryKey: ["MOVIE_CREDITS", movieId],
    queryFn: () => fetchMovieCredits(movieId!),
    enabled: !!movieId
  });

  console.log("rexx", movieCredits)

  return (
    <div>
      <CarouselMovie data={movieDetails} />
      <MovieImageComponent movieId={movieId} />
      <RecomendationSec data={movieRecomendations} />
      <MovieCreditsComponent data={movieCredits} />
    </div>
  );
};

export default MovieDetailPage;
