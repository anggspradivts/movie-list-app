import { useParams } from "react-router-dom";

const AnimeDetailPage = () => {
  const { animeId } = useParams();
  console.log(animeId)
  return ( 
    <div>
      animeId : {animeId}
    </div>
   );
}
 
export default AnimeDetailPage;