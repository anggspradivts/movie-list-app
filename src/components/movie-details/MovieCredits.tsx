import { Cast, MovieCredits } from "@/types/movie-credits";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { Link } from "react-router-dom";
import { ArrowBigRight, LoaderCircle } from "lucide-react";

interface MovieCreditsComponentProps {
  data: MovieCredits | undefined;
  isLoading: boolean;
}
const MovieCreditsComponent = ({
  data,
  isLoading,
}: MovieCreditsComponentProps) => {
  const castingData: Cast[] = data?.cast || [].slice(0, 20);
  return (
    <div className="mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Credits</h1>
      </div>
      <ScrollXLayout>
        
        <div className="flex space-x-4 h-full">
          {castingData.map((item, index) => {
              return (
                <Link key={index} to={`/actor/${item.id}`}>
                  {isLoading ? (
                    <div className="h-full w-full flex justify-center items-center">
                      <LoaderCircle className="animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-1 h-[200px] md:h-[300px] min-w-[100px] md:min-w-[150px]">
                      <div className="h-4/6 w-full flex justify-center items-center bg-black bg-opacity-20 overflow-hidden">
                        {item.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                            alt="poster_movie"
                            loading="lazy"
                            className="object-cover h-full w-full relative"
                          />
                        ) : (
                          <div className="">No image provided</div>
                        )}
                      </div>
                      <div className="space-y-1 h-2/6">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs">{item.known_for_department}</p>
                        <p className="text-xs">{item.character}</p>
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          <div className="min-w-[100px] md:min-w-[150px] ">
            <p className="flex p-5 bg-black bg-opacity-10 shadow-2xl">
              Lihat Lebih{" "}
              <span>
                <ArrowBigRight />
              </span>
            </p>
          </div>
        </div>
      </ScrollXLayout>
    </div>
  );
};

export default MovieCreditsComponent;
