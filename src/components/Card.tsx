import { SkeletonCard } from "./ui/skeleton-card";
import { Link } from "react-router-dom";

interface CardProps {
  id: number;
  category: string;
  imagePath: string | undefined;
  title: string;
  isLoading: boolean;
  release_date?: string;
  asActor?: string;
}
const Card = ({
  id,
  isLoading,
  imagePath,
  title,
  category,
  release_date,
  asActor
}: CardProps) => {
  return (
    <Link to={`/${category}/${id}`}>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="h-[200px] md:h-[300px] min-w-[100px] md:min-w-[150px] border border-submain2">
          <div className="h-4/6 w-full flex justify-center items-center bg-black bg-opacity-20 overflow-hidden">
            {imagePath ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${imagePath}`}
                alt="poster_movie"
                loading="lazy"
                className="object-cover h-full w-full relative"
              />
            ) : (
              <div className="">No image provided</div>
            )}
          </div>
          <div className="text-center space-y-1 h-2/6 p-1 bg-black bg-opacity-10 relative text-submain2">
            <p className="font-semibold">{title}</p>
            {asActor && 
              <p className="md:text-sm">{asActor}</p>
            }
            {release_date && (
              <p className="absolute left-2 bottom-1">
                {new Date(release_date).getFullYear()}
              </p>
            )}
          </div>
        </div>
      )}
    </Link>
  );
};

export default Card;
