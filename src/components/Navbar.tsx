import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={cn(
      "flex justify-between items-center h-[50px]",
      "bg-transparent"
    )}>
      <div className="">logo</div>
      <div className="flex">
        <NavLink to={"/about"}>About</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
