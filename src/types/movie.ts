export interface MovieProps {
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
  genres: [];
  origin_country: [];
}