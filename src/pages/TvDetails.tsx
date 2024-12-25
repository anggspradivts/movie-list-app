import CarouselTvComponent from "@/components/tv-details/Carousel";
import TvReccommendationsComponent from "@/components/tv-details/TvReccommendation";
import TvCreditsComponent from "@/components/tv-details/TvCredits";
import TvVideoComponent from "@/components/tv-details/TvVideo";
import { PeopleDetails } from "@/types/actor-details";
import { MovieVideoProps } from "@/types/movie-video";
import { TVDetailsProps } from "@/types/tv-props";
import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const TvDetailsPage = () => {
  const { tvId } = useParams();

  const { data: tvDetails, isLoading: isLoadingDetails } =
    useQuery<TVDetailsProps>({
      queryKey: ["MOVIE_DETAILS", tvId],
      queryFn: () =>
        fetchData({
          method: "GET",
          apiEndpoint: `https://api.themoviedb.org/3/tv/${tvId}?language=en-US`,
        }),
      enabled: !!tvId,
    });

  const { data: tvReccommendations, isLoading: isLoadingReccommendation } =
    useQuery<{
      results: TVDetailsProps[];
    }>({
      queryKey: ["TV_RECC", tvId],
      queryFn: () =>
        fetchData({
          method: "GET",
          apiEndpoint: `https://api.themoviedb.org/3/tv/${tvId}/recommendations?language=en-US&page=1`,
        }),
      enabled: !!tvId,
    });

  const { data: tvCredits, isLoading: isLoadingCredits } = useQuery<{
    results: { cast: PeopleDetails[] };
  }>({
    queryKey: ["TV_CRED", tvId],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/tv/${tvId}/credits?language=en-US`,
      }),
    enabled: !!tvId,
  });

  const { data: tvVideo } = useQuery<MovieVideoProps>({
    queryKey: ["MOVIE_VIDEO", tvId],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`,
      }),
    enabled: !!tvId,
  });


  return (
    <div>
      <CarouselTvComponent data={tvDetails} />
      <TvVideoComponent data={tvVideo} />
      <TvReccommendationsComponent
        data={tvReccommendations?.results}
        isLoading={isLoadingReccommendation}
      />
      <TvCreditsComponent isLoading={isLoadingCredits} data={tvCredits} />
    </div>
  );
};

export default TvDetailsPage;
