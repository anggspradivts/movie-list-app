import { MovieDetailsProps } from "@/types/movie-details";
import { TVDetailsProps } from "@/types/tv-props";
import ScrollXLayout from "../layouts/ScrollXlayout";
import { SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Card from "../Card";

interface TrendingComponentProps {
  data: MovieDetailsProps[] | TVDetailsProps[] | undefined;
  isLoading: boolean;
  setTrendingState: React.Dispatch<SetStateAction<string>>;
  trendingState: string;
}
const TrendingComponent = ({
  data,
  isLoading,
  setTrendingState,
  trendingState,
}: TrendingComponentProps) => {
  const [filterOverlay, setFilterOverlay] = useState(false);

  const handleClickOverlay = () => {
    setFilterOverlay((prevState) => !prevState);
  };

  return (
    <div>
      <div className="py-[30px] flex space-x-5 items-center">
        <h1 className="text-2xl font-bold">Trending</h1>
        <p>Filter by</p>
        <div className="relative flex flex-col ">
          <Button
            onClick={handleClickOverlay}
            className={cn("active:translate-y-1 min-w-[80px]", {
              "bg-submain2 hover:bg-submain2": trendingState,
            })}
          >
            {trendingState}
          </Button>
          {filterOverlay && (
            <Button
              onClick={() =>
                setTrendingState(trendingState === "day" ? "week" : "day")
              }
              className="absolute -bottom-10 z-[2000] min-w-[80px]"
            >
              {trendingState === "day" ? "week" : "day"}
            </Button>
          )}
        </div>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full">
          {Array.isArray(data) &&
            data.map((item, index) => {
              return (
                <Card
                  key={index}
                  category={"movie"}
                  id={item.id}
                  imagePath={item.backdrop_path}
                  isLoading={isLoading}
                  title={"title" in item ? item.title : item.name}
                  release_date={"release_date" in item ? item.release_date : ""}
                />
              );
            })}
        </div>
      </ScrollXLayout>
    </div>
  );
};

export default TrendingComponent;
