import { Filter } from "lucide-react";

const FilterSec = () => {
  return ( 
    <div className="flex py-[30px] px-1 border-b border-submain2 text-white">
      <button className="active:animate-spin">
        <Filter />
      </button>
    </div>
   );
}
 
export default FilterSec;