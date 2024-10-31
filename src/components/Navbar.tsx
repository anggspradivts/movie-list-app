import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.body.classList.toggle("dark-mode", storedTheme === "dark")
    } else {
      setIsDarkMode(false)
    }
  }, []);

  const toggleDarkMode = () => {
    console.log("clik")
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark-mode", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light")
      return newMode
    })
  }

  return (
    <div className={cn(
      "flex justify-between items-center h-[50px]",
      "bg-transparent"
    )}>
      <div className="">logo</div>
      <div className="flex">
        <div className="w-[300px] min-w-[200px] h-[30px]">
          <input type="search" name="" id=""
          className={cn(
            "w-full h-full border-black",
            ""
          )}/>
        </div>
        <div className="flex">
          <Switch onCheckedChange={toggleDarkMode} checked={isDarkMode}/>
          <label htmlFor="darkmode">Dark Mode</label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
