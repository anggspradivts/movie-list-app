import { MovieVideoProps } from "@/types/movie-video";

interface VideoComponentProps {
  data: MovieVideoProps | undefined;
  movieVideoKey: string | undefined;
}
const VideoComponent = ({ data, movieVideoKey }: VideoComponentProps) => {
  return (
    <>
      {data && Array.isArray(data.results) && data.results.length > 1 ? (
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
          Oops video is not available
        </p>
      )}
    </>
  );
};

export default VideoComponent;
