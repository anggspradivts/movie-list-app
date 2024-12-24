import { cn } from "@/lib/utils";
import { PeopleDetails } from "@/types/actor-details";
import { useState } from "react";
import ContentNotFound from "../ui/content-not-found";

interface CarouselPeopleProps {
  data: PeopleDetails | undefined;
}
const CarouselPeople = ({ data }: CarouselPeopleProps) => {
  const [biographyState, setBiographyState] = useState(300);
  return (
    <div
      className="h-auto w-full bg-cover bg-center shadow-lg text-white shadow-submain2"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${data?.profile_path})`,
      }}
    >
      <div
        className={cn(
          "h-full w-full bg-black bg-opacity-50 backdrop-blur-lg",
          "flex justify-center items-center"
        )}
      >
        <div className="flex justify-center flex-col md:flex-row md:space-x-5 m-[20px] md:m-[100px] lg:m-[200px]">
          <div className="flex justify-center items-center h-[200px] w-[150px] shadow-md flex-shrink-0">
            {data?.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <ContentNotFound type="with-context" context="image" classname="bg-slate-100"  />
            )}
          </div>
          <div className="space-y-4">
            <div className="flex space-x-2 ">
              <p className="text-lg font-bold">{data?.name}</p>
            </div>

            {data?.biography && data?.biography.length > biographyState ? (
              <p>
                {data?.biography.slice(0, biographyState) + "... "}
                <button
                  className="text-submain2 italic"
                  onClick={() => setBiographyState((prev) => prev * 2)}
                >
                  see more
                </button>
              </p>
            ) : (
              <p>{data?.biography}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselPeople;
