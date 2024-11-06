import { cn } from "@/lib/utils";
import { NavLink, useParams } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";
import backgroundImage from "@/assets/imdb_top_250.jpg";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { movieId } = useParams();
  
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
    <div
      className="first-content relative h-screen bg-center bg-cover bg-black bg-opacity-15"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        borderBottomRightRadius: "440px",
        borderBottomLeftRadius: "440px",
      }}
    >
      <div
        className="sec-content absolute inset-0 h-full bg-black bg-opacity-30"
        style={{
          borderBottomRightRadius: "440px",
          borderBottomLeftRadius: "440px",
          boxShadow: "0 4px 40px rgba(0, 0, 400, 0.5)"
        }}
      >
        <nav
          className={cn(
            "flex justify-between items-center h-[70px] bg-black bg-opacity-40"
          )}
        >
          <div className="">logo</div>
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <Switch onCheckedChange={toggleDarkMode} checked={isDarkMode} />
              <label htmlFor="darkmode">
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </label>
            </div>
          </div>
        </nav>
        <div className="flex flex-col gap-7 justify-center items-center h-full">
          <p className="font-black text-4xl text-white">
            Watch Movies
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
