import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import SearchbarComponent from "../Searchbar";
import { NavLink } from "react-router-dom";
import UserAvatarComponent from "./UserAvatar";
interface DesktopNavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
const DesktopNavbar = ({ toggleDarkMode, isDarkMode }: DesktopNavbarProps) => {
  return (
    <nav
      className={cn(
        "flex justify-between items-center h-[70px] md:px-[50px] bg-black bg-opacity-40"
      )}
    >
      <div className="w-[100px]">
        <NavLink to={"/"}>
          <h1 className="font-bold"> Movie List</h1>
        </NavLink>
      </div>
      <div className="flex w-full space-x-5 items-center">
        <SearchbarComponent />
        <UserAvatarComponent />
        <div className="flex flex-col space-y-1 items-center">
          <Switch onCheckedChange={toggleDarkMode} checked={isDarkMode} />
          <label htmlFor="darkmode" className="text-[0.8rem]">
            {isDarkMode ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </label>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
