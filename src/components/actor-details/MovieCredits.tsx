import { MovieDetailsProps } from "@/types/movie-details";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { Link } from "react-router-dom";
import { SkeletonCard } from "../ui/skeleton-card";
import { ArrowBigRight } from "lucide-react";

interface MovieCreditsProps {
  data: MovieDetailsProps[] | undefined;
  isLoading: boolean;
}
const MovieCredits = ({ data, isLoading }: MovieCreditsProps) => {

  return (
    <div className="mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Movie Credits</h1>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full">
          {Array.isArray(data) && data.map((item, index) => {
            return (
              <Link key={index} to={`/actor/${item.id}`}>
                {isLoading ? (
                  <SkeletonCard />
                ) : (
                  <div className="h-[200px] md:h-[300px] min-w-[100px] md:min-w-[150px]">
                    <div className="h-4/6 w-full flex justify-center items-center bg-black bg-opacity-20 overflow-hidden">
                      {item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt="poster_movie"
                          loading="lazy"
                          className="object-cover h-full w-full relative"
                        />
                      ) : (
                        <div className="">No image provided</div>
                      )}
                    </div>
                    <div className="text-center space-y-1 h-2/6 p-1 bg-black bg-opacity-30">
                      <p className="font-semibold">{item.title}</p>
                      <p className="">{item.release_date}</p>
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

export default MovieCredits;
