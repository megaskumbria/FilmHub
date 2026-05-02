import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/constants";

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

export interface ITmdbMovie {
  adult: boolean;
  backdrop_path: string | null;
  backdrop_url: string | null;
  belongs_to_collection: ICollection | null;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  poster_url: string | null;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: IMovieCredits;
  images: IMovieImages;
}

export const useMovie = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await axios.get<ITmdbMovie>(`${API_URL}/movies/movie/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
