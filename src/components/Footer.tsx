const Footer = () => {
  return ( 
    <div className="flex justify-center items-center bg-black bg-opacity-40 h-[50px] mt-20">
      <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
   );
}
 
export default Footer;