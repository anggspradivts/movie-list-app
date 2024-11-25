import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { MovieDetailsProps } from "@/types/movie-details";
import { useEffect, useState } from "react";
import { TVDetailsProps } from "@/types/tv-props";
import { fetchData } from "@/utils/fetchData";

interface TopMoviesProps {
  data: MovieDetailsProps[] | TVDetailsProps[];
  isLoading: boolean;
}
const TopMoviesComponent = ({ data, isLoading }: TopMoviesProps) => {

  return (
    <div>
      <div className="py-[30px] flex justify-between items-center">
        <h1 className="text-2xl font-bold">Top Movies</h1>
        <button
          // onClick={() => navigate(`/movie/${item.id}`)}
          className="bg-black bg-opacity-10 text-white p-2 px-3 rounded [box-shadow:0_5px_5px_rgba(0,0,0,0.2)] active:translate-y-1"
        >
          More
        </button>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full">
          {data &&
            data.map((item, index) => {
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
                        <p className="font-bold">
                          {"title" in item ? item.title : item.name}
                        </p>
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

export default TopMoviesComponent;
