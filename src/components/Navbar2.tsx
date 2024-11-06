import { useEffect, useState } from "react";
import DesktopNavbar from "./navbar/DesktopNavbar";
import MobileNavbar from "./navbar/MobileNavbar";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
