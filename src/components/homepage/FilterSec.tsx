import { cn } from "@/lib/utils";
import { SetStateAction } from "react";

interface FilterCategoryProps {
  filterState: string;
  setFilterState: React.Dispatch<SetStateAction<string>>
}
const FilterSec = ({ setFilterState, filterState }: FilterCategoryProps) => {
  const filterBtn = [
    {
      name: "Movie",
      category: "movie",
    },
    {
      name: "TV",
      category: "tv",
    },
  ];

  const handleStateClick = (state: string) => {
    setFilterState(state)
  };

  return (
    <div className="flex items-center pt-[10px] space-x-2 h-[70px] px-1 border-b border-submain2 text-white">
      {filterBtn.map((item, index) => {
        return (
          <button
            key={index}
            className={cn(
              "font-bold relative h-full w-[70px] bg-black bg-opacity-20 group",
              { "bg-black bg-opacity-100": filterState === item.category }
            )}
            onClick={() => handleStateClick(item.category)}
          >
            {item.name}
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[2px] w-full transition-transform scale-x-0 group-hover:scale-x-100 duration-300 bg-submain2 origin-center",
                {
                  "scale-x-100": item.category === filterState,
                  "scale-x-0 group-hover:scale-x-100":
                    item.category !== filterState,
                }
              )}
            ></span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterSec;
