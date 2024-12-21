import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { MovieDetailsProps } from "@/types/movie-details";
import { NavLink } from "react-router-dom";
import { handleClickOutside } from "@/utils/handleClickOutside";

const SearchbarComponent = () => {
  const [keyword, setKeyword] = useState<string | null>("");
  const [isShowOverlay, setIsShowOverlay] = useState<boolean>(false);
  const overlayRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<{ results: MovieDetailsProps[] } | null>(
    null
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      handleClickOutside({
        event,
        ref: overlayRef,
        setState: setIsShowOverlay,
      });
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`,
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
    };

    if (keyword) {
      const delayDebounceFn = setTimeout(() => {
        fetchData();
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [keyword]);

  return (
    <div className="relative flex items-center w-full h-[30px]">
      <div className="flex w-full h-[50px] bg-white rounded-full border border-black p-1">
        <input
          ref={overlayRef}
          type="search"
          name="keyword"
          value={keyword || ""}
          id="keyword"
          placeholder="search movies..."
          onChange={(e) => setKeyword(e.target.value)}
          className={cn(
            "p-4 w-full h-full text-black border-none outline-none",
            "rounded-full"
          )}
          onFocus={() => setIsShowOverlay(true)}
        />
        {!keyword && (
          <div className="flex justify-center items-center bg-orange-500  px-3 md:px-4 rounded-full">
            Search
          </div>
        )}
      </div>
      {isShowOverlay && (
        <div
          className={cn(
            "absolute left-0 right-0 top-10 mt-1 z-[9999] min max-h-[200px] rounded-3xl overflow-y-auto px-4",
            "bg-white border border-black text-black"
          )}
          ref={overlayRef}
        >
          {Array.isArray(data?.results) && data.results.length > 0 ? (
            <div className="flex flex-col p-1 space-y-3">
              {data?.results?.map((item) => (
                <NavLink key={item.id} to={`/movie/${item.id}`}>
                  <div className="w-full">{item.title}</div>
                </NavLink>
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
