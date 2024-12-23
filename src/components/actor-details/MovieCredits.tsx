import { MovieDetailsProps } from "@/types/movie-details";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { Link } from "react-router-dom";
import { SkeletonCard } from "../ui/skeleton-card";
import { ArrowBigRight } from "lucide-react";
import Card from "../Card";

interface MovieCreditsProps {
  data: MovieDetailsProps[] | undefined;
  isLoading: boolean;
}
const MovieCredits = ({ data, isLoading }: MovieCreditsProps) => {
  return (
    <div className="mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Movie Credits</h1>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full">
          {Array.isArray(data) &&
            data.map((item, index) => {
              return (
                <Card
                  key={index}
                  category={"actor"}
                  id={item.id}
                  imagePath={item.backdrop_path}
                  isLoading={isLoading}
                  title={item.title}
                  release_date={"release_date" in item ? item.release_date : ""}
                />
              );
            })}
          <div className="min-w-[100px] md:min-w-[150px] ">
            <p className="flex p-5 bg-black bg-opacity-10 shadow-2xl">
              Lihat Lebih{" "}
              <span>
                <ArrowBigRight />
              </span>
            </p>
          </div>
        </div>
      </ScrollXLayout>
    </div>
  );
};

export default MovieCredits;
