import CarouselPeople from "@/components/actor-details/Carousel";
import MovieCredits from "@/components/actor-details/MovieCredits";
import TvCredits from "@/components/actor-details/TvCredits";
import { PeopleDetails } from "@/types/actor-details";
import { MovieDetailsProps } from "@/types/movie-details";
import { TVDetailsProps } from "@/types/tv-props";
import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFound";
import { ErrorResponse } from "@/types/api-response";

const ActorDetails = () => {
  const { actorId } = useParams<{ actorId: string }>();

  const { data: peopleDetails } = useQuery<PeopleDetails>({
    queryKey: ["MOVIE_DETAILS", actorId],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/person/${actorId}?language=en-US`,
      }),
    enabled: !!actorId,
    throwOnError: true
  });

  const { data: movieCredits, isLoading: isLoadingMovie } = useQuery<{
    cast: MovieDetailsProps[];
  }>({
    queryKey: ["MOVIE_CREDITS", actorId],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/person/${actorId}/movie_credits?language=en-US`,
      }),
    enabled: !!actorId,
  });

  const { data: tvCredits, isLoading: isLoadingTv } = useQuery<{
    cast: TVDetailsProps[];
  }>({
    queryKey: ["TV_CREDITS", actorId],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/person/${actorId}/tv_credits?language=en-US`,
      }),
    enabled: !!actorId,
  });

  console.log(peopleDetails)

  if (peopleDetails && "success" in peopleDetails && !peopleDetails.success) return <NotFoundPage />;

  return (
    <div>
      <CarouselPeople data={peopleDetails} />
      <MovieCredits isLoading={isLoadingMovie} data={movieCredits?.cast} />
      <TvCredits data={tvCredits?.cast} isLoading={isLoadingTv} />
    </div>
  );
};

export default ActorDetails;
