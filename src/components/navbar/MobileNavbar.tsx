import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";

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
        <h1 className="font-bold">Movie List</h1>
      </div>
      <div className="">
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="flex flex-col">
                <Switch onCheckedChange={toggleDarkMode} checked={isDarkMode} />
                <label htmlFor="darkmode" className="text-[0.8rem]">
                  {isDarkMode ? "🌙" : "☀️"}
                </label>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileNavbar;
