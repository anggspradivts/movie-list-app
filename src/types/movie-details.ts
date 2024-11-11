export type MovieDetailsProps = {
  adult: boolean;
  id: string;
  status: string;
  tagline: string;
  poster_path: string;
  backdrop_path: string;
  release_date: Date;
  title: string;
  original_title: string;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
  origin_country: [];
  popularity: number;
  vote_average: number;
  vote_count: number;
}