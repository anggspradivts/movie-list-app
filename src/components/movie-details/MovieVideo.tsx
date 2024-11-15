import { MovieVideoProps } from "@/types/movie-video";

interface MovieVideoComponentProps {
  data: MovieVideoProps | undefined;
}
const MovieVideoComponent = ({ data }: MovieVideoComponentProps) => {
  const movieVideoKey = data?.results?.[0]?.key;

  return (
    <div className="flex justify-center mx-[20px] md:mx-[100px] lg:mx-[200px] mt-10">
      <div className="w-full h-[400px] lg:h-[600px]">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${movieVideoKey}`}
          // frameBorder="0"
          title={data?.results?.[0].name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieVideoComponent;
