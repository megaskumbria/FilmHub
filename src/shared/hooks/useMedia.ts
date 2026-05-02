import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/constants";
import { MediaType } from "../stores/movie-catalog";

export interface IGenre {
  id: number;
  name: string;
}

export interface ICollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface IProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ICastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  profile_url: string | null;
  order: number;
  known_for_department: string;
}

export interface IBackdrop {
  file_path: string;
  width: number;
  height: number;
  vote_average: number;
  url: string | null;
}

export interface IMovieCredits {
  cast: ICastMember[];
}

export interface IMovieImages {
  backdrops: IBackdrop[];
  posters: IBackdrop[];
}

export interface IVideoResult {
  id: string;
  iso_639_1?: string;
  iso_3166_1?: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface IMediaVideos {
  results: IVideoResult[];
}

export interface ITvCreator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface ITvNetwork {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

/** Эпизод в last_episode_to_air / next_episode_to_air. */
export interface ITvEpisodeAir {
  id: number;
  name: string;
  overview: string;
  air_date: string | null;
  episode_number: number;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface ITvSeason {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface ITmdbMovie {
  // ——— Common ———

  adult: boolean;
  backdrop_path: string | null;
  backdrop_url: string | null;
  genres: IGenre[];
  homepage: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  poster_url: string | null;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  credits: IMovieCredits;
  images: IMovieImages;
  languages?: string[];

  /** У сериалов основное имя; у фильмов чаще смотрите title. */
  name?: string;
  origin_country?: string[];
  videos?: IMediaVideos;

  // ——— Movie only ———
  belongs_to_collection: ICollection | null;
  budget: number;
  imdb_id: string | null;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
  original_title: string;
  release_date: string;

  // ——— TV only ———
  created_by?: ITvCreator[];
  episode_run_time?: number[];
  first_air_date?: string;
  in_production?: boolean;
  last_air_date: string;
  last_episode_to_air?: ITvEpisodeAir | null;
  networks?: ITvNetwork[];
  next_episode_to_air?: ITvEpisodeAir | null;
  number_of_episodes?: number;
  number_of_seasons?: number;
  original_name: string;
  seasons?: ITvSeason[];

  /** Тип шоу TMDB (например Scripted); не путать с query type=movie|tv. */
  type?: string;
}

export const useMovie = (id: number, type: MediaType) => {
  return useQuery({
    queryKey: ["movie", id, type],
    queryFn: async () => {
      const { data } = await axios.get<ITmdbMovie>(`${API_URL}/movies/movie/${id}?type=${type}`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
