import { MovieVideoProps } from "@/types/movie-video";
import VideoComponent from "../Video";

interface TvVideoComponentProps {
  data: MovieVideoProps | undefined;
}
const TvVideoComponent = ({ data }: TvVideoComponentProps) => {
  const movieVideoKey = data?.results?.[0]?.key;
  return (
    <div className="flex justify-center mx-[20px] md:mx-[100px] lg:mx-[200px] mt-10">
      <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] flex justify-center items-center bg-slate-200">
        <VideoComponent 
          data={data}
          movieVideoKey={movieVideoKey}
        />
      </div>
    </div>
  );
};

export default TvVideoComponent;