import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface MovieImageComponentProps {
  data: { file_path: string }[] | undefined;
}
const MovieImageComponent = ({ data }: MovieImageComponentProps) => {
  const [imageOverlay, setImageOverlay] = useState<boolean>(false);
  const imagesOverlay = useRef<HTMLDivElement | null>(null);
  const [totalViewImg, setTotalViewImg] = useState(20);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      imagesOverlay.current &&
      !imagesOverlay.current.contains(event.target as Node)
    ) {
      setImageOverlay(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const slicedMovieImage =
    data && Array.isArray(data) && data.map((item) => item).slice(0, 3);
  const totalMovieImage =
    data && Array.isArray(data) && data.map((item) => item);

  return (
    <div className="h-[400px] mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Photos</h1>
      </div>
      {slicedMovieImage && slicedMovieImage.length > 2 ? (
        <div
          className={cn("gap-x-1", {
            "grid grid-cols-2":
              slicedMovieImage && slicedMovieImage?.length > 2,
          })}
        >
          <div className="h-[300px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${
                slicedMovieImage && slicedMovieImage[0].file_path
              }`}
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-1">
            <div className="h-[150px]">
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
              className="h-[150px]"
            >
              <div className="bg-black bg-opacity-40 h-full flex justify-center items-center">
                <button
                  onClick={() => setImageOverlay(true)}
                  className="h-full w-full text-white"
                >
                  {"+" + totalMovieImage &&
                    Array.isArray(totalMovieImage) &&
                    totalMovieImage.length - slicedMovieImage.length}
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
                    {totalMovieImage &&
                      totalMovieImage
                        .slice(0, totalViewImg)
                        .map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex justify-center items-center"
                            >
                              <img
                                className="h-full w-full"
                                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                                alt=""
                                loading="lazy"
                              />
                            </div>
                          );
                        })}
                  </div>
                </div>
                <center className="center">
                  {totalMovieImage && totalViewImg < totalMovieImage.length && (
                    <Button
                      onClick={() => setTotalViewImg((prev) => prev * 2)}
                      className="bg-submain2"
                    >
                      view more
                    </Button>
                  )}
                </center>
              </div>
            </div>
          )}
        </div>
      ) : slicedMovieImage && slicedMovieImage.length > 0 ? (
        <div className="h-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${
              slicedMovieImage && slicedMovieImage[0].file_path
            }`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-[200px] flex justify-center items-center">
          <p>No image available</p>
        </div>
      )}
    </div>
  );
};

export default MovieImageComponent;
