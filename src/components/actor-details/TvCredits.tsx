import ScrollXLayout from "../layouts/ScrollXlayout";
import { ArrowBigRight } from "lucide-react";
import { TVDetailsProps } from "@/types/tv-props";
import Card from "../Card";

interface TvCreditsProps {
  data: TVDetailsProps[] | undefined;
  isLoading: boolean;
}
const TvCredits = ({ data, isLoading }: TvCreditsProps) => {
  return (
    <div className="mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Tv Credits</h1>
      </div>
      {data && data.length > 0 ? (
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
                    title={item.name}
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
      ) : (
        <div className="w-full ">No credits yet in TV</div>
      )}
    </div>
  );
};

export default TvCredits;
