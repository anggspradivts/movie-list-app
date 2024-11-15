import { Cast, Crew, MovieCredits } from "@/types/movie-credits";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface MovieCreditsComponentProps {
  data: MovieCredits | undefined;
}
const MovieCreditsComponent = ({ data }: MovieCreditsComponentProps) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {

    if (data) {
      setIsLoading(false)
    } else {
      setIsLoading(true);
    }
  }, [data])

  const castingData: Cast[] = data?.cast || [];
  const crewData: Crew[] = data?.crew || [];
  const creditData = [...castingData, ...crewData].slice(0, 20);

  return (
    <div className="mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Credits</h1>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 ">
          {creditData.map((item) => {
              return (
                <Link key={item.id} to={`/credits/${item.id}`}>
                  <div className="space-y-1 ">
                    <div className="min-w-[100px] md:min-w-[150px] flex justify-center items-center bg-black bg-opacity-20">
                      {isLoading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                          alt="poster_movie"
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold">{item.name}</p>
                      {/* <p>
                        {new Date(item.release_date).getFullYear().toString()}
                      </p> */}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </ScrollXLayout>
    </div>
   );
}
 
export default MovieCreditsComponent;