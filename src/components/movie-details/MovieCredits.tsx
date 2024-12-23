import { Cast, MovieCredits } from "@/types/movie-credits";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { ArrowBigRight } from "lucide-react";
import Card from "../Card";

interface MovieCreditsComponentProps {
  data: MovieCredits | undefined;
  isLoading: boolean;
}
const MovieCreditsComponent = ({
  data,
  isLoading,
}: MovieCreditsComponentProps) => {
  const castingData: Cast[] = data?.cast || [].slice(0, 20);
  return (
    <div className="mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Credits</h1>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full">
          {castingData.map((item, index) => {
            return (
              <Card
                key={index}
                category={"actor"}
                id={item.id}
                imagePath={item.profile_path}
                isLoading={isLoading}
                title={item.name}
                asActor={item.known_for_department}
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

export default MovieCreditsComponent;
