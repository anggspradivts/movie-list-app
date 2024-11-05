import { MovieProps } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import TopMoviesComponent from "@/components/homepage/TopMovies";
import CarouselComponent from "@/components/homepage/Carousel";

const HomePage = () => {
  const fetchData = async () => {
    const res = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    const data = await res.json();
    
    return data.results as MovieProps[] //return top movies page 1
  };

  const { data, isLoading } = useQuery({
    queryKey: ["MOVIE"],
    queryFn: () => fetchData(),
  });

  console.log(data)

  if (!data) {
    return <div>No data</div>
  }

  return (
    <div className="flex flex-col justify-center px-4 md:px-[50px] lg:px-[100px]">
      <CarouselComponent data={data} />
      <TopMoviesComponent data={data} isLoading={isLoading} />
    </div>
   );
}
 
export default HomePage;