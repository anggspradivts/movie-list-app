import { MovieProps } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface movieImageProps {
  movie: MovieProps;
  backdrops: { file_path: string }[];
}
interface MovieImageComponentProps {
  movieId: string | undefined;
}
const MovieImageComponent = ({ movieId }: MovieImageComponentProps) => {
  const [imageOverlay, setImageOverlay] = useState<boolean>(false);
  const imagesOverlay = useRef<HTMLDivElement | null>(null);
  const fetchData = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data as movieImageProps;
  };

  const { data } = useQuery({
    queryKey: ["MOVIE_IMG"],
    queryFn: fetchData,
  });

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click was outside the overlay
    if (
      imagesOverlay.current &&
      !imagesOverlay.current.contains(event.target as Node)
    ) {
      setImageOverlay(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const slicedMovieImage = data?.backdrops.map((item) => item).slice(0, 3);
  const totalMovieImage = data?.backdrops.map((item) => item);

  return (
    <div className="h-[400px] mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Photos</h1>
      </div>
      <div className="grid grid-cols-2 gap-x-1">
        <div className="h-[200px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${
              slicedMovieImage && slicedMovieImage[0].file_path
            }`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-1">
          <div className="h-[100px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${
                slicedMovieImage && slicedMovieImage[1].file_path
              }`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${
                slicedMovieImage && slicedMovieImage[2].file_path
              })`,
            }}
            className="h-[100px]"
          >
            <div className="bg-black bg-opacity-40 h-full flex justify-center items-center">
              <button
                onClick={() => setImageOverlay(true)}
                className="h-full w-full text-white"
              >
                {"+" + data?.backdrops.length}
              </button>
            </div>
          </div>
        </div>
        {imageOverlay && (
          <div className="flex justify-center items-center fixed inset-0 h-screen w-screen bg-black bg-opacity-50 z-[9999]">
            <div
              ref={imagesOverlay}
              className="h-2/3 w-2/3 p-5 bg-white overflow-y-scroll space-y-4"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setImageOverlay(false)}
                  className="bg-black text-white"
                >
                  <X />
                </button>
              </div>
              <div className="images-container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                  {totalMovieImage?.map((item, index) => {
                    // const [isLoading, setIsLoading] = useState(true)
                    return (
                      <div key={index} className="flex justify-center items-center">
                        <img
                          className="h-full w-full"
                          src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                          alt=""
                          loading="lazy"
                          // onLoad={() => setIsLoading(false)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieImageComponent;
