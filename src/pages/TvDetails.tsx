import CarouselTvComponent from "@/components/tv-details/Carousel";
import TvReccommendationsComponent from "@/components/tv-details/TvReccommendation";
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
      results: TVDetailsProps[]
    }>({
      queryKey: ["TV_RECC", tvId],
      queryFn: () =>
        fetchData({
          method: "GET",
          apiEndpoint: `https://api.themoviedb.org/3/tv/${tvId}/recommendations?language=en-US&page=1
`,
        }),
      enabled: !!tvId,
    });


  return (
    <div>
      <CarouselTvComponent data={tvDetails} />
      <TvReccommendationsComponent data={tvReccommendations} isLoading={isLoadingReccommendation} />
    </div>
  );
};

export default TvDetailsPage;
