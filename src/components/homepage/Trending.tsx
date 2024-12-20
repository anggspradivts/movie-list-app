import { MovieDetailsProps } from "@/types/movie-details";
import { TVDetailsProps } from "@/types/tv-props";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface TrendingComponentProps {
  data:
    | { results: MovieDetailsProps[] }
    | { results: TVDetailsProps[] }
    | undefined;
  isLoading: boolean;
  setTrendingState: React.Dispatch<SetStateAction<string>>;
  trendingState: string;
}
const TrendingComponent = ({
  data,
  isLoading,
  setTrendingState,
  trendingState,
}: TrendingComponentProps) => {
  const [filterOverlay, setFilterOverlay] = useState(false);

  const handleClickOverlay = () => {
    setFilterOverlay((prevState) => !prevState);
  };

  return (
    <div>
      <div className="py-[30px] flex space-x-5 items-center">
        <h1 className="text-2xl font-bold">Trending</h1>
        <p>Filter by</p>
        <div className="relative flex flex-col ">
          <Button
            onClick={handleClickOverlay}
            className={cn(
              "active:translate-y-1 min-w-[80px]",
              {"bg-submain2 hover:bg-submain2": trendingState}
            )}
          >
            {trendingState}
          </Button>
          {filterOverlay && (
            <Button onClick={() => setTrendingState(trendingState === "day" ? "week" : "day")} className="absolute -bottom-10 z-[2000] min-w-[80px]">
              {trendingState === "day" ? "week" : "day"}
            </Button>
          )}
        </div>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full ">
          {data &&
            data.results.map((item, index) => {
              const displayTitle =
                "title" in item
                  ? item.title.length > 25
                    ? item.title.slice(0, 25) + "..."
                    : item.title
                  : item.name;

              return (
                //"title" in item is used for check if it is a movie or tv
                <Link key={index} to={`/${"title" in item ? "movie" : "tv"}/${item.id}`}>
                  {isLoading ? (
                    <div className="h-full w-full flex justify-center items-center rounded">
                      <LoaderCircle className="animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-1 h-4/6 min-w-[100px] md:min-w-[150px] hover:-translate-y-1 transition-all duration-300">
                      <div className="h-full w-full relative flex justify-center items-center bg-black bg-opacity-20 overflow-hidden ">
                        {item.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt="poster_movie"
                            loading="lazy"
                            className="object-cover h-full w-full "
                          />
                        ) : (
                          <div className="">No image provided</div>
                        )}
                      </div>
                      <div className="space-y-1 h-2/6 p-1">
                        <p className="font-semibold">{displayTitle}</p>
                        {"release_date" in item && (
                          <p>
                            {new Date(item.release_date || "")
                              .getFullYear()
                              .toString()}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
        </div>
      </ScrollXLayout>
    </div>
  );
};

export default TrendingComponent;
