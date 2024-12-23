import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import SearchbarComponent from "../Searchbar";
import { AlignJustify } from "lucide-react";
import { NavLink } from "react-router-dom";

interface MobileNavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}
const MobileNavbar = ({ toggleDarkMode, isDarkMode }: MobileNavbarProps) => {
  return (
    <nav
      className={cn(
        "flex justify-between items-center h-[70px] px-5 md:px-[50px] bg-black bg-opacity-40"
      )}
    >
      <div className="">
        <NavLink to={"/"}>
          <h1 className="font-bold text-lg"> Movie List</h1>
        </NavLink>
      </div>
      <div className="">
        <Sheet>
          <SheetTrigger>
            <AlignJustify />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-center">
            <SheetHeader>
              <div className="flex flex-col space-y-1 text-black items-center ">
                <Switch onCheckedChange={toggleDarkMode} checked={isDarkMode} />
                <label htmlFor="darkmode" className="text-[0.8rem]">
                  {isDarkMode ? (
                    <MoonIcon className="h-5 w-5" />
                  ) : (
                    <SunIcon className="h-5 w-5" />
                  )}
                </label>
              </div>
            </SheetHeader>
            <SearchbarComponent />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileNavbar;
