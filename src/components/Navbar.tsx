import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-[50px] bg-red-500">
      <div className="">logo</div>
      <div className="flex">
        <NavLink to={"/about"}>About</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
