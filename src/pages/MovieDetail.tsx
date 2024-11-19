import CarouselMovie from "@/components/movie-details/Carousel";
import MovieCreditsComponent from "@/components/movie-details/MovieCredits";
import MovieImageComponent from "@/components/movie-details/MovieImg";
import MovieVideoComponent from "@/components/movie-details/MovieVideo";
import RecomendationSec from "@/components/movie-details/Recomendation";
import { MovieCredits } from "@/types/movie-credits";
import { MovieDetailsProps } from "@/types/movie-details";
import { MovieVideoProps } from "@/types/movie-video";
import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    data: movieDetails,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
  } = useQuery<MovieDetailsProps>({
    queryKey: ["MOVIE_DETAILS", movieId],
    // queryFn: () => fetchMovieDetails(movieId!),
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      }),
    enabled: !!movieId,
  });

  const { data: movieRecomendations, isLoading: isLoadingRec } = useQuery<{
    results: MovieDetailsProps[];
  }>({
    queryKey: ["MOVIE_RECOMENDATION", movieId],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
      }),
    enabled: !!movieId,
  });

  const { data: movieCredits, isLoading: isLoadingCredits } =
    useQuery<MovieCredits>({
      queryKey: ["MOVIE_CREDITS", movieId],
      queryFn: () =>
        fetchData({
          method: "GET",
          apiEndpoint: `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        }),
      enabled: !!movieId,
    });

  const { data: movieVideo, isLoading: isLoadingVideo } =
    useQuery<MovieVideoProps>({
      queryKey: ["MOVIE_VIDEO", movieId],
      queryFn: () =>
        fetchData({
          method: "GET",
          apiEndpoint: `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        }),
      enabled: !!movieId,
    });

  return (
    <div>
      <CarouselMovie data={movieDetails} />
      <MovieVideoComponent data={movieVideo} />
      <MovieImageComponent movieId={movieId} />
      <RecomendationSec data={movieRecomendations} />
      <MovieCreditsComponent data={movieCredits} isLoading={isLoadingCredits} />
    </div>
  );
};

export default MovieDetailPage;
