import ScrollXLayout from "../layouts/ScrollXlayout";
import { Link } from "react-router-dom";
import { ArrowBigRight, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { MovieDetailsProps } from "@/types/movie-details";

interface RecomendationSecProps {
  data: { results: MovieDetailsProps[] } | undefined;
}
const RecomendationSec = ({ data }: RecomendationSecProps) => {
  const [isLoading, setIsLoading] = useState();
  return (
    <div className="mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Recomendations</h1>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full">
          {data &&
            data.results.map((item, index) => {
              return (
                <Link key={index} to={`/movie/${item.id}`}>
                  {isLoading ? (
                    <div className="h-full w-full flex justify-center items-center">
                      <LoaderCircle className="animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-1 h-full min-w-[100px] md:min-w-[150px]">
                      <div className="h-4/6 w-full flex justify-center items-center bg-black bg-opacity-20 overflow-hidden">
                        {item.backdrop_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                            alt="poster_movie"
                            loading="lazy"
                            className="object-cover h-full w-full relative"
                          />
                        ) : (
                          <div className="">No image provided</div>
                        )}
                      </div>
                      <div className="space-y-1 h-2/6">
                        <p className="font-bold">{item.title}</p>
                        <p>
                          {new Date(item.release_date || "")
                            .getFullYear()
                            .toString()}
                        </p>
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

export default RecomendationSec;
