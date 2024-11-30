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
      <div ref={scrollRef} className="overflow-x-auto h-[200px] md:h-[300px] scrollbar-hidden">
        {children}
      </div>
      <button onClick={() => handleScroll("left")} className="absolute text-white bg-black bg-opacity-70 rounded bottom-1/2 left-0 p-[10px] ml-1 z-[2000]">
        <ChevronLeft />
      </button>
      <button onClick={() => handleScroll("right")} className="absolute text-white bg-black bg-opacity-70 rounded bottom-1/2 right-0 p-[10px] mr-1 z-[2000]">
        <ChevronRight />
      </button>
    </div>
   );
}
 
export default ScrollXLayout;