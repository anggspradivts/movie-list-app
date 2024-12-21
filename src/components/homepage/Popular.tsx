import { Link } from "react-router-dom";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { MovieDetailsProps } from "@/types/movie-details";
import { TVDetailsProps } from "@/types/tv-props";
import { SkeletonCard } from "../ui/skeleton-card";

interface PopularProps {
  data:
    | { results: MovieDetailsProps[] }
    | { results: TVDetailsProps[] }
    | undefined;
  isLoading: boolean;
}
const PopularComponent = ({ data, isLoading }: PopularProps) => {
  
  return (
    <div>
      <div className="py-[30px] flex justify-between items-center">
        <h1 className="text-2xl font-bold">Popular</h1>
        <button
          className="bg-black bg-opacity-10 text-white p-2 px-3 rounded [box-shadow:0_5px_5px_rgba(0,0,0,0.2)] active:translate-y-1"
        >
          More
        </button>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full ">
          {data &&
            data.results.map((item, index) => {
              const title =
                "title" in item
                  ? item.title.length > 25
                    ? item.title.slice(0, 25) + "..."
                    : item.title
                  : item.name;

              return (
                <Link
                  key={index}
                  to={`/${"title" in item ? "movie" : "tv"}/${item.id}`}
                >
                  {isLoading ? (
                    <SkeletonCard />
                  ) : (
                    <div className="space-y-1 h-4/6 min-w-[100px] md:min-w-[150px]">
                      <div className="h-full w-full relative flex justify-center items-center bg-black bg-opacity-20 overflow-hidden">
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
                        <p className="font-semibold">{title}</p>
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

export default PopularComponent;
