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
import { Navigate, useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  if (!movieId) return <Navigate to={"/not-found"} />;

  const { data: movieDetails } = useQuery<MovieDetailsProps>({
    queryKey: ["MOVIE_DETAILS", movieId],
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

  const { data: movieVideo } = useQuery<MovieVideoProps>({
    queryKey: ["MOVIE_VIDEO", movieId],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      }),
    enabled: !!movieId,
  });

  const { data: movieImages } = useQuery<{ backdrops: { file_path: string }[] }>({
    queryKey: ["MOVIE_IMAGES", movieId],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/movie/${movieId}/images`,
      }),
    enabled: !!movieId,
  });

  return (
    <div>
      <CarouselMovie data={movieDetails} />
      <MovieVideoComponent data={movieVideo} />
      <MovieImageComponent data={movieImages?.backdrops} />
      <RecomendationSec
        data={movieRecomendations?.results}
        isLoading={isLoadingRec}
      />
      <MovieCreditsComponent data={movieCredits} isLoading={isLoadingCredits} />
    </div>
  );
};

export default MovieDetailPage;
