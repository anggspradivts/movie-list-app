import { MovieProps } from "@/types/movie";
import { Link } from "react-router-dom";

interface TopMoviesProps {
  data: MovieProps[];
  isLoading: boolean;
}
const TopMoviesComponent = ({ data, isLoading }: TopMoviesProps) => {
  const slicedData = data.slice(0, 10);
  return (
    <div className="overflow-x-auto pt-[30px]">
      <div className="flex space-x-4">
        {isLoading ? (
          <div>
            Loading
          </div>
        ) : (
          slicedData.map((item) => {
            return (
              <Link key={item.id} to={`/movie/${item.id}`}>
                <div className="min-w-[100px] md:min-w-[150px] shadow-md">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt="poster_movie"
                  />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TopMoviesComponent;
