import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return ( 
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
   );
}
 
export default DefaultLayout;