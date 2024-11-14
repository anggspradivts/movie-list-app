import { MovieProps } from "@/types/movie";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

interface RecomendationSecProps {
  data: { movie_recomendation: MovieProps[] };
}
const RecomendationSec = ({ data }: RecomendationSecProps) => {
  const [isLoading, setIsLoading] = useState();
  return (
    <div className="mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Recomendations</h1>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 ">
          {data &&
            Array.isArray(data.movie_recomendation) &&
            data.movie_recomendation.map((item) => {
              return (
                <Link key={item.id} to={`/movie/${item.id}`}>
                  <div className="space-y-1 ">
                    <div className="min-w-[100px] md:min-w-[150px] flex justify-center items-center bg-black bg-opacity-20">
                      {isLoading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt="poster_movie"
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold">{item.title}</p>
                      <p>
                        {new Date(item.release_date).getFullYear().toString()}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </ScrollXLayout>
    </div>
  );
};

export default RecomendationSec;
