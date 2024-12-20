import Navbar from "@/components/Navbar2";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return ( 
    <div>
      <Navbar />
      <Outlet />
    </div>
   );
}
 
export default DefaultLayout;