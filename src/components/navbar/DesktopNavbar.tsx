import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
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
        <div className="flex flex-col items-center">
          <Switch onCheckedChange={toggleDarkMode} checked={isDarkMode} />
          <label htmlFor="darkmode" className="text-[0.8rem]">
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </label>
        </div>
      </div>
    </nav>
   );
}
 
export default DesktopNavbar;