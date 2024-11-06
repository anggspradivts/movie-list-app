import { cn } from "@/lib/utils";
import { MovieProps } from "@/types/movie";

interface CarouselMovieProps {
  data: MovieProps | undefined;
}
const CarouselMovie = ({ data }: CarouselMovieProps) => {
  return (
    <div
      className="h-[500px] w-full bg-cover bg-center shadow-md"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${data?.backdrop_path})`,
      }}
    >
      <div
        className={cn(
          "h-full w-full bg-black bg-opacity-50 backdrop-blur-md",
          "flex justify-center items-center"
        )}
      >
        <div className="h-1/2 w-1/2 grid grid-cols-1 md:grid-cols-2  bg-black">
          <div className="h-[200px] w-[150px] flex justify-center items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt=""
              className=""
            />
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            adipisci recusandae nemo obcaecati quae nesciunt facilis nulla in.
            Nam facere esse placeat asperiores! Deserunt, quod aut asperiores
            ducimus obcaecati laudantium.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselMovie;
