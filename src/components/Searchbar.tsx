import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { MovieProps } from "@/types/movie";

const SearchbarComponent = () => {
  const [keyword, setKeyword] = useState<string | null>("");
  const [data, setData] = useState<MovieProps[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${keyword}?page=1`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      setData(data);
      console.log(keyword);
    };

    if (keyword) {
      const delayDebounceFn = setTimeout(() => {
        fetchData();
      }, 500);
      return () => clearTimeout(delayDebounceFn)
    }
  }, [keyword]);

  return (
    <div className="relative w-[300px] min-w-[200px] h-[30px]">
      <input
        type="search"
        name="keyword"
        id="keyword"
        placeholder="search movies..."
        onChange={(e) => setKeyword(e.target.value)}
        className={cn(
          "p-4 w-full h-full border-black border text-black",
          "rounded-lg"
        )}
      />
      <SearchIcon className="absolute top-4 right-2 transform -translate-y-1/2 text-slate-700" />
      {keyword && (
        <div className="absolute left-0 right-0 mt-1 z-[9999] min-h-[50px] rounded-lg bg-white border border-black">
          {Array.isArray(data) && data.length > 0 ? (
            <div className="p-1">
              {data?.map((item) => (
                <div className="" key={item.id}></div>
              ))}
            </div>
          ) : (
            <div className="p-1">
              <p className="text-black">
                {keyword
                  ? "No movies found"
                  : "No movies found, type something..."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchbarComponent;
