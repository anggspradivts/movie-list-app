import { useQuery } from "@tanstack/react-query";
import TopMoviesComponent from "@/components/homepage/TopMovies";
import CarouselComponent from "@/components/homepage/Carousel";
import FilterSec from "@/components/homepage/FilterSec";
import { fetchData } from "@/utils/fetchData";
import { MovieDetailsProps } from "@/types/movie-details";

const HomePage = () => {
  const { data, isLoading } = useQuery<MovieDetailsProps[]>({
    queryKey: ["MOVIE"],
    queryFn: () => fetchData({
      method: "GET",
      apiEndpoint: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
    }),
  });

  if (!data) {
    return <div>No data</div>
  }

  return (
    <div className="flex flex-col justify-center px-4 md:px-[50px] lg:px-[100px]">
      <CarouselComponent data={data} />
      <FilterSec />
      <TopMoviesComponent data={data} isLoading={isLoading} />
    </div>
   );
}
 
export default HomePage;