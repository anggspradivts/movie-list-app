import { TVDetailsProps } from "@/types/tv-props";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { ArrowBigRight } from "lucide-react";
import Card from "../Card";

interface TvSimilarComponentProps {
  data: TVDetailsProps[] | undefined;
  isLoading: boolean;
}
const TvSimilarComponent = ({
  data,
  isLoading,
}: TvSimilarComponentProps) => {
  return (
    <div className="mx-[20px] md:mx-[100px] lg:mx-[200px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Similar</h1>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full">
          {data &&
            Array.isArray(data) &&
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
    </div>
  );
};

export default TvSimilarComponent;
