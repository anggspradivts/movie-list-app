import { useParams } from "react-router-dom";

const AnimeDetailPage = () => {
  const { movieId } = useParams();
  console.log(movieId)
  return ( 
    <div>
      movieId : {movieId}
    </div>
   );
}
 
export default AnimeDetailPage;