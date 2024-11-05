import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
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
      <div className="">
        <h1 className="font-bold">Movie List</h1>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col space-y-1 items-center">
          <Switch onCheckedChange={toggleDarkMode} checked={isDarkMode} />
          <label htmlFor="darkmode" className="text-[0.8rem]">
            {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </label>
        </div>
      </div>
    </nav>
   );
}
 
export default DesktopNavbar;