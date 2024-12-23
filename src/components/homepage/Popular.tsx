import ScrollXLayout from "../layouts/ScrollXlayout";
import { MovieDetailsProps } from "@/types/movie-details";
import { TVDetailsProps } from "@/types/tv-props";
import Card from "../Card";

interface PopularProps {
  data: MovieDetailsProps[] | TVDetailsProps[] | undefined;
  isLoading: boolean;
}
const PopularComponent = ({ data, isLoading }: PopularProps) => {
  return (
    <div className="lg:mx-[0px]">
      <div className="py-[30px]">
        <h1 className="text-2xl font-bold">Popular</h1>
      </div>
      <ScrollXLayout>
        <div className="flex space-x-4 h-full">
          {Array.isArray(data) &&
            data.map((item, index) => {
              return (
                <Card
                  key={index}
                  category={"title" in item ? "movie" : "tv"}
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

export default PopularComponent;
