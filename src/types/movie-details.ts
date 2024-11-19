export type MovieDetailsProps = {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: null;
  budget?: number;
  genres?: Genre[];
  genre_ids?: number[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country?: string[];
  original_language?: string;
  original_title: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: Productioncompany[];
  production_countries?: Productioncountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: Spokenlanguage[];
  status?: string;
  tagline?: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export type Spokenlanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type Productioncountry = {
  iso_3166_1: string;
  name: string;
}

export type Productioncompany = {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
}

export type Genre = {
  id: number;
  name: string;
}