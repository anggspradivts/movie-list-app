import { cn } from "@/lib/utils";

interface FilterCategoryProps {
  filterCategory: string | null
}
const FilterSec = ({ filterCategory }: FilterCategoryProps) => {
  const filterBtn = [
    {
      name: "TV",
      category: "tv"
    },
    {
      name: "Movie",
      category: "movie"
    },
    {
      name: "All",
      category: "all"

    },
  ];

  const handleClick = (category: string) => {
    localStorage.setItem("category", category)
  };

  console.log(filterCategory)

  return (
    <div className="flex items-center pt-[10px] space-x-2 h-[70px] px-1 border-b border-submain2 text-white">
      {filterBtn.map((item, index) => {
        return (
          <button
            key={index}
            className={cn(
              "font-bold relative h-full w-[70px] bg-black bg-opacity-10 group",
              {"bg-black bg-opacity-40": filterCategory === item.category}
            )}
            onClick={() => handleClick(item.category)}
          >
            {item.name}
            <span className="absolute bottom-0 left-0 h-[2px] w-full transition-transform scale-x-0 group-hover:scale-x-100 duration-300 bg-submain2 origin-center"></span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterSec;
