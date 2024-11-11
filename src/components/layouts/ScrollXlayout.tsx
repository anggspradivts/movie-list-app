import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface ScrollXLayoutProps {
  children: React.ReactNode
}
const ScrollXLayout = ({ children }: ScrollXLayoutProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: string) => {
    if (scrollRef.current) {
      if (direction === "right") {
        scrollRef.current.scrollBy({
          left: 150, // Adjust the scroll amount as needed
          behavior: 'smooth',
        });
      } else {
        scrollRef.current.scrollBy({
          left: -150,
          behavior: 'smooth'
        })
      }
    }
  };
  return ( 
    <div className="relative">
      <div ref={scrollRef} className="overflow-x-auto pt-[30px]">
        {children}
      </div>
      <button onClick={() => handleScroll("left")} className="absolute text-white bg-black bg-opacity-70 rounded bottom-1/2 left-0 p-[10px] md:p-[20px] ml-1">
        <ChevronLeft />
      </button>
      <button onClick={() => handleScroll("right")} className="absolute text-white bg-black bg-opacity-70 rounded bottom-1/2 right-0 p-[10px] md:p-[20px] mr-1">
        <ChevronRight />
      </button>
    </div>
   );
}
 
export default ScrollXLayout;