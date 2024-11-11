import { MovieProps } from "@/types/movie";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import ScrollXLayout from "../layouts/ScrollXlayout";

interface TopMoviesProps {
  data: MovieProps[];
  isLoading: boolean;
}
const TopMoviesComponent = ({ data, isLoading }: TopMoviesProps) => {
  const slicedData = data.slice(0, 10);

  return (
    <ScrollXLayout>
      <div className="flex space-x-4 ">
          {slicedData.map((item) => {
            return (
              <Link key={item.id} to={`/movie/${item.id}`}>
                <div  className="space-y-1 ">
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
  );
};

export default TopMoviesComponent;
