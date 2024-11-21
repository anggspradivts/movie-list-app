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
      }

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
    <div className="relative w-full h-[30px]">
      <input
        ref={overlayRef}
        type="search"
        name="keyword"
        value={keyword || ""}
        id="keyword"
        placeholder="search movies..."
        onChange={(e) => setKeyword(e.target.value)}
        className={cn(
          "p-4 w-full h-full border-black border text-black",
          "rounded-lg"
        )}
        onFocus={() => setIsShowOverlay(true)}
      />
      {!keyword ? (
        <SearchIcon className="absolute top-4 right-2 transform -translate-y-1/2 text-slate-700" />
      ) : (
        <X
          onClick={() => setKeyword("")}
          className="absolute top-4 right-2 transform -translate-y-1/2 text-slate-700"
        />
      )}
      {isShowOverlay && (
        <div
          className={cn(
            "absolute left-0 right-0 mt-1 z-[9999] min max-h-[200px] rounded-lg overflow-y-auto px-4",
            "bg-white border border-black text-black"
          )}
          ref={overlayRef}
        >
          {Array.isArray(data?.results) && data.results.length > 0 ? (
            <div className="p-1">
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
