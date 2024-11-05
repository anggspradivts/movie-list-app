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

interface CarouselProps {
  data: MovieProps[];
}
const CarouselComponent = ({ data }: CarouselProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div
      className="w-full px-[30px] lg:px-0"
      // style={{ boxShadow: "0 4px 40px rgba(0, 0, 400, 0.5)" }}
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
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
                }}
              >
                <div className="flex justify-end items-center h-full w-full bg-black text-white bg-opacity-70">
                  <div className="flex flex-col space-y-5 p-[30px] text-end">
                    <h1 className="font-black text-[2rem]">{item.title}</h1>
                    <p className="text-[0.5rem] md:text-base">
                      {item.overview}
                    </p>
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
