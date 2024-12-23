import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetchData";
import { MovieDetailsProps } from "@/types/movie-details";
import { useState } from "react";
import { TVDetailsProps } from "@/types/tv-props";
import PopularComponent from "@/components/homepage/Popular";
import CarouselComponent from "@/components/homepage/Carousel";
import FilterSec from "@/components/homepage/FilterSec";
import TrendingComponent from "@/components/homepage/Trending";

const HomePage = () => {
  const [filterState, setFilterState] = useState("movie");
  const [trendingState, setTrendingState] = useState("day");

  //BY POPULARITY
  const { data: popularData, isLoading: isPopularLoading } = useQuery<{
    results: MovieDetailsProps[] | TVDetailsProps[];
  }>({
    queryKey: [filterState, filterState],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/${filterState}/popular?language=en-US&page=1`,
      }),
    select: (data) => {
      return filterState === "movie"
        ? { results: data.results as MovieDetailsProps[] }
        : { results: data.results as TVDetailsProps[] };
    },
  });

  //BY TRENDING
  const { data: trendingData, isLoading: isTrendingLoading } = useQuery<{
    results: MovieDetailsProps[] | TVDetailsProps[];
  }>({
    queryKey: [trendingState, trendingState],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/trending/all/${trendingState}?language=en-US`,
      }),
  });

  return (
    <div className="flex flex-col justify-center px-4 md:px-[50px] lg:px-[100px]">
      <CarouselComponent data={popularData?.results} />
      <FilterSec filterState={filterState} setFilterState={setFilterState} />
      <PopularComponent
        data={popularData?.results}
        isLoading={isPopularLoading}
      />
      <TrendingComponent
        data={trendingData?.results}
        isLoading={isTrendingLoading}
        setTrendingState={setTrendingState}
        trendingState={trendingState}
      />
    </div>
  );
};

export default HomePage;
