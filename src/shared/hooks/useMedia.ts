import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/constants";
import { MediaType } from "../stores/movie-catalog";

export interface Genre {
  id: number;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  posterPath: string | null;
  backdropPath: string | null;
}

export interface ProductionCompany {
  id: number;
  logoPath: string | null;
  name: string;
  originCountry: string;
}

export interface ProductionCountry {
  iso31661: string;
  name: string;
}

export interface SpokenLanguage {
  englishName: string;
  iso6391: string;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  profileUrl: string | null;
  order: number;
  knownForDepartment: string;
}

export interface Backdrop {
  filePath: string;
  width: number;
  height: number;
  voteAverage: number;
  url: string | null;
}

export interface MovieCredits {
  cast: CastMember[];
}

export interface MovieImages {
  backdrops: Backdrop[];
  posters: Backdrop[];
}

export interface VideoResult {
  id: string;
  iso6391?: string;
  iso31661?: string;
  key: string;
  name: string;
  official: boolean;
  publishedAt: string;
  site: string;
  size: number;
  type: string;
}

export interface MediaVideos {
  results: VideoResult[];
}

export interface TvCreator {
  id: number;
  creditId: string;
  name: string;
  gender: number;
  profilePath: string | null;
}

export interface TvNetwork {
  id: number;
  logoPath: string | null;
  name: string;
  originCountry: string;
}

/** Эпизод в lastEpisodeToAir / nextEpisodeToAir. */
export interface TvEpisodeAir {
  id: number;
  name: string;
  overview: string;
  airDate: string | null;
  episodeNumber: number;
  runtime: number | null;
  seasonNumber: number;
  showId: number;
  stillPath: string | null;
  voteAverage: number;
  voteCount: number;
}

export interface TvSeason {
  airDate: string | null;
  episodeCount: number;
  id: number;
  name: string;
  overview: string;
  posterPath: string | null;
  seasonNumber: number;
  voteAverage: number;
}

export interface TmdbMovie {
  // ——— Common ———

  adult: boolean;
  backdropPath: string | null;
  backdropUrl: string | null;
  genres: Genre[];
  homepage: string;
  id: number;
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  posterUrl: string | null;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  voteAverage: number;
  voteCount: number;
  credits: MovieCredits;
  images: MovieImages;
  languages?: string[];

  /** У сериалов основное имя; у фильмов чаще смотрите title. */
  name?: string;
  originCountry?: string[];
  videos?: MediaVideos;

  // ——— Movie only ———
  belongsToCollection: Collection | null;
  budget: number;
  imdbId: string | null;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
  originalTitle: string;
  releaseDate: string;

  // ——— TV only ———
  createdBy?: TvCreator[];
  episodeRunTime?: number[];
  firstAirDate?: string;
  inProduction?: boolean;
  lastAirDate: string;
  lastEpisodeToAir?: TvEpisodeAir | null;
  networks?: TvNetwork[];
  nextEpisodeToAir?: TvEpisodeAir | null;
  numberOfEpisodes?: number;
  numberOfSeasons?: number;
  originalName: string;
  seasons?: TvSeason[];

  /** Тип шоу TMDB (например Scripted); не путать с query type=movie|tv. */
  type?: string;
}

export const useMovie = (id: number, type: MediaType) => {
  return useQuery({
    queryKey: ["movie", id, type],
    queryFn: async () => {
      const { data } = await axios.get<TmdbMovie>(`${API_URL}/movies/movie/${id}?type=${type}`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
