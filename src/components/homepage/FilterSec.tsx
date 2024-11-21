import { cn } from "@/lib/utils";
import { fetchData } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";

interface FilterCategoryProps {
  filterCategory: string | null;
}
const FilterSec = ({ filterCategory }: FilterCategoryProps) => {
  const { refetch } = useQuery({
    queryKey: ["MOVIE_CATEGORY", filterCategory],
    queryFn: () =>
      fetchData({
        method: "GET",
        apiEndpoint: `https://api.themoviedb.org/3/${filterCategory}/popular?language=en-US&page=1`,
      }),
  });

  const filterBtn = [
    {
      name: "TV",
      category: "tv",
    },
    {
      name: "Movie",
      category: "movie",
    },
    {
      name: "All",
      category: "all",
    },
  ];

  const handleClick = (category: string) => {
    localStorage.setItem("category", category);
    refetch();
  };

  return (
    <div className="flex items-center pt-[10px] space-x-2 h-[70px] px-1 border-b border-submain2 text-white">
      {filterBtn.map((item, index) => {
        return (
          <button
            key={index}
            className={cn(
              "font-bold relative h-full w-[70px] bg-black bg-opacity-10 group",
              { "bg-black bg-opacity-20": filterCategory === item.category }
            )}
            onClick={() => handleClick(item.category)}
          >
            {item.name}
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[2px] w-full transition-transform scale-x-0 group-hover:scale-x-100 duration-300 bg-submain2 origin-center",
                {
                  "scale-x-100": item.category === filterCategory,
                  "scale-x-0 group-hover:scale-x-100":
                    item.category !== filterCategory,
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
