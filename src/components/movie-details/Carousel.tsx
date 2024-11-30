import { cn } from "@/lib/utils";
import { Genre, MovieDetailsProps } from "@/types/movie-details";
import { NavLink } from "react-router-dom";

interface CarouselMovieProps {
  data: MovieDetailsProps | undefined;
}
const CarouselMovie = ({ data }: CarouselMovieProps) => {
  console.log(data);
  return (
    <div
      className="h-[500px] w-full bg-cover bg-center shadow-lg text-white shadow-submain2"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${data?.backdrop_path})`,
      }}
    >
      <div
        className={cn(
          "h-full w-full bg-black bg-opacity-50 backdrop-blur-lg",
          "flex justify-center items-center"
        )}
      >
        <div className="flex flex-col md:flex-row md:space-x-5 mx-[20px] md:m-[100px] lg:m-[200px]">
          <div className="h-[200px] w-[150px] shadow-md flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <p className="text-lg font-bold">{data?.title}</p>
              <p className="text-lg font-bold">
                {`[${new Date(data?.release_date || "").getFullYear()}]`}
              </p>
            </div>
            <p>{data?.overview}</p>
            <div className="flex space-x-3 md:space-x-5">
              {/* <button className="bg-submain2 bg-opacity-40 text-white p-3 px-5 rounded-full shadow-md">
                View Trailer
              </button> */}
              <div>
                <p className="font-bold">Genres:</p>
                <div className="flex">
                  {data && data?.genres.map((genre: Genre, index) => (
                    <NavLink key={index} to={`/genres/${genre.name}`}>
                      <p>
                        {genre.name}
                        {index < data.genres.length - 1 && ","}{" "}
                      </p>
                    </NavLink>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold">Rating:</p>
                <span>
                  {data && Math.floor(data.vote_average * 10) / 10} / 10{" "}
                  <span>⭐</span>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselMovie;
