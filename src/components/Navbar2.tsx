import { cn } from "@/lib/utils";
import { NavLink, useParams } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";
import backgroundImage from "@/assets/imdb_top_250.jpg";
import DesktopNavbar from "./navbar/DesktopNavbar";
import MobileNavbar from "./navbar/MobileNavbar";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [keyword, setKeyword] = useState("");

  // const moviePoster =

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      //toggle body and nav class
      document.body.classList.toggle("dark-mode", storedTheme === "dark");
      document
        .querySelector("nav")
        ?.classList.toggle("dark-mode", storedTheme === "dark");
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch("/");
      // const data = await res.json();
      console.log(keyword);
    };
    fetchData();
  }, [keyword]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark-mode", newMode);
      document.querySelector("nav")?.classList.toggle("dark-mode", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <div>
      <div className="block md:hidden">
        <MobileNavbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </div>
      <div className="hidden md:block">
        <DesktopNavbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Navbar;
