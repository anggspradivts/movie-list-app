import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { MovieDetailsProps } from "@/types/movie-details";
import { NavLink } from "react-router-dom";
import { handleClickOutside } from "@/utils/handleClickOutside";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetchData";

const SearchbarComponent = () => {
  const [keyword, setKeyword] = useState<string | null>("");
  const [isShowOverlay, setIsShowOverlay] = useState<boolean>(false);
  const overlayRef = useRef<HTMLInputElement>(null);

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

  const { data: searchData } = useQuery<{ results: MovieDetailsProps[] } | null>({
    queryKey: ["MOVIE_KEYWORD", keyword],
    queryFn: () => fetchData({
      method: "GET",
      apiEndpoint: `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`
    }),
  });

  return (
    <div className="relative flex items-center w-1/2 h-[30px]">
      <div className="flex w-full h-[40px] bg-white rounded-full border border-black p-1">
        <input
        ref={overlayRef}
          type="search"
          name="keyword"
          value={keyword || ""}
          id="keyword"
          placeholder="search movies..."
          onChange={(e) => setKeyword(e.target.value)}
          className={cn(
            "p-4 w-full h-auto text-black border-none outline-none",
            "rounded-full"
          )}
          onFocus={() => setIsShowOverlay(true)}
        />
        {!keyword && (
          <div className="flex justify-center items-center bg-submain2 text-white px-3 md:px-4 rounded-full">
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
          {Array.isArray(searchData?.results) && searchData.results.length > 0 ? (
            <div className="flex flex-col p-1 space-y-2">
              {searchData?.results?.map((item) => (
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
