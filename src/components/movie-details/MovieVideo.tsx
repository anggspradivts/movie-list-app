import { MovieVideoProps } from "@/types/movie-video";

interface MovieVideoComponentProps {
  data: MovieVideoProps | undefined;
}
const MovieVideoComponent = ({ data }: MovieVideoComponentProps) => {
  const movieVideoKey = data?.results?.[0]?.key;
  return (
    <div className="flex justify-center mx-[20px] md:mx-[100px] lg:mx-[200px] mt-10">
      <div className="w-full h-[200px] lg:h-[400px] flex justify-center items-center bg-slate-200">
        {data && Array.isArray(data) && data.results.length < 1 ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${movieVideoKey}`}
            title={data?.results?.[0].name || ""}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-black font-semibold text-xl">
            Oops video trailer is not available
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieVideoComponent;
