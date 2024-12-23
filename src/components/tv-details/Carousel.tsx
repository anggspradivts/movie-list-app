import { cn } from "@/lib/utils";
import { Genre } from "@/types/tv-props";
import { TVDetailsProps } from "@/types/tv-props";
import { NavLink } from "react-router-dom";

interface CarouselTvComponentProps {
  data: TVDetailsProps | undefined;
}
const CarouselTvComponent = ({ data }: CarouselTvComponentProps) => {
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
              <p className="text-lg font-bold">{data?.name}</p>
              <p className="text-lg font-bold">
                {/* {`[${new Date(data?.release_date || "").getFullYear()}]`} */}
              </p>
            </div>
            {/* <p>{data?.overview}</p> */}
            <div className="flex flex-col ">
              <div>
                <p className="font-bold">Genres:</p>
                <div className="flex">
                  {data?.genres &&
                    Array.isArray(data.genres) &&
                    data?.genres.map((genre: Genre, index: number) => {
                      return (
                        <NavLink key={index} to={`/genres/${genre.name}`}>
                          <p>
                            {genre.name}
                            {index < data.genres.length - 1 && ","}{" "}
                          </p>
                        </NavLink>
                      );
                    })}
                </div>
              </div>
              <div className="flex space-x-5">
                <div>
                  <p className="font-bold">Rating:</p>
                  <span>
                    {data && Math.floor(data.vote_average * 10) / 10} / 10{" "}
                    <span>⭐</span>{" "}
                  </span>
                </div>
                <div>
                  <p className="font-bold">Spoken languages:</p>
                  <div className="flex">
                    {data?.spoken_languages ? (
                      Array.isArray(data.spoken_languages) &&
                      data.spoken_languages.map((lang, index) => {
                        return (
                          <p key={index}>
                            {lang.name}
                            {index < data.spoken_languages.length - 1 && ","}{" "}
                          </p>
                        );
                      })
                    ) : (
                      <p>No data from database</p>
                    )}
                  </div>
                </div>
              </div>
              <p className="font-bold">episode: {data?.number_of_episodes}</p>
              <p className="font-bold">First airing/Last airing: {data?.last_air_date && new Date(data?.first_air_date).toDateString()}/{data?.last_air_date && new Date(data?.last_air_date).toDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselTvComponent;
