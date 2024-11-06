import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { MovieProps } from "@/types/movie";
import { useNavigate } from "react-router-dom";

interface CarouselProps {
  data: MovieProps[];
}
const CarouselComponent = ({ data }: CarouselProps) => {
  const navigate = useNavigate()
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  return (
    <div
      className="flex w-full justify-center px-[30px] lg:px-0"
      style={{ boxShadow: "0 10px 10px rgba(0, 0, 0, 0.5)" }}
    >
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index}>
              <div
                className="w-full h-[300px] md:h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`,
                }}
              >
                <div className="flex justify-end items-center h-full w-full bg-black text-white bg-opacity-70 backdrop-blur-sm">
                  <div className="flex flex-col space-y-3 p-[30px] lg:px-[200px] items-end text-end">
                    <div className="hidden lg:block">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt="poster_movie"
                        className="h-[200px] w-[150px]"
                      />
                    </div>
                    <h1 className="font-black text-[2rem]">{item.title}</h1>
                    <p className="text-[0.5rem] md:text-base">
                      {item.overview}
                    </p>
                    <div className="flex gap-2 text-[0.5rem] md:text-[1rem]">
                      <button className="bg-black bg-opacity-40 text-white p-3 px-5 rounded-full shadow-md">
                        View Trailer
                      </button>
                      <button onClick={() => navigate(`/movie/${item.id}`)} className="bg-submain2 bg-opacity-40 text-white p-3 px-5 rounded-full shadow-md">
                        View More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
