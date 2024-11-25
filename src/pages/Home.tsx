import { useQuery } from "@tanstack/react-query";
import TopMoviesComponent from "@/components/homepage/TopMovies";
import CarouselComponent from "@/components/homepage/Carousel";
import FilterSec from "@/components/homepage/FilterSec";
import { fetchData } from "@/utils/fetchData";
import { MovieDetailsProps } from "@/types/movie-details";
import { useState } from "react";
import { TVDetailsProps } from "@/types/tv-props";

const HomePage = () => {
  const [filterState, setFilterState] = useState("movie");

  const { data: topData, isLoading } = useQuery<
    { results: MovieDetailsProps[] } | { results: TVDetailsProps[] }
  >({
    queryKey: ["MOVIE_POPULAR", filterState],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/${filterState}/popular?language=en-US&page=1`,
      }),
  });

  const combinedData =
    filterState === "movie" //handle type defintion for fetched data based on filter state
      ? (topData?.results as MovieDetailsProps[])
      : (topData?.results as TVDetailsProps[]);

  if (!topData) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col justify-center px-4 md:px-[50px] lg:px-[100px]">
      <CarouselComponent data={combinedData} />
      <FilterSec filterState={filterState} setFilterState={setFilterState} />
      <TopMoviesComponent data={combinedData} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
