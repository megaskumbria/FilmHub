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
  posterPath: string | null;
  backdropPath: string | null;
}

export interface IProductionCompany {
  id: number;
  logoPath: string | null;
  name: string;
  originCountry: string;
}

export interface IProductionCountry {
  iso31661: string;
  name: string;
}

export interface ISpokenLanguage {
  englishName: string;
  iso6391: string;
  name: string;
}

export interface ICastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  profileUrl: string | null;
  order: number;
  knownForDepartment: string;
}

export interface IBackdrop {
  filePath: string;
  width: number;
  height: number;
  voteAverage: number;
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

export interface IMediaVideos {
  results: IVideoResult[];
}

export interface ITvCreator {
  id: number;
  creditId: string;
  name: string;
  gender: number;
  profilePath: string | null;
}

export interface ITvNetwork {
  id: number;
  logoPath: string | null;
  name: string;
  originCountry: string;
}

/** Эпизод в lastEpisodeToAir / nextEpisodeToAir. */
export interface ITvEpisodeAir {
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

export interface ITvSeason {
  airDate: string | null;
  episodeCount: number;
  id: number;
  name: string;
  overview: string;
  posterPath: string | null;
  seasonNumber: number;
  voteAverage: number;
}

export interface ITmdbMovie {
  // ——— Common ———

  adult: boolean;
  backdropPath: string | null;
  backdropUrl: string | null;
  genres: IGenre[];
  homepage: string;
  id: number;
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  posterUrl: string | null;
  productionCompanies: IProductionCompany[];
  productionCountries: IProductionCountry[];
  spokenLanguages: ISpokenLanguage[];
  status: string;
  tagline: string;
  voteAverage: number;
  voteCount: number;
  credits: IMovieCredits;
  images: IMovieImages;
  languages?: string[];

  /** У сериалов основное имя; у фильмов чаще смотрите title. */
  name?: string;
  originCountry?: string[];
  videos?: IMediaVideos;

  // ——— Movie only ———
  belongsToCollection: ICollection | null;
  budget: number;
  imdbId: string | null;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
  originalTitle: string;
  releaseDate: string;

  // ——— TV only ———
  createdBy?: ITvCreator[];
  episodeRunTime?: number[];
  firstAirDate?: string;
  inProduction?: boolean;
  lastAirDate: string;
  lastEpisodeToAir?: ITvEpisodeAir | null;
  networks?: ITvNetwork[];
  nextEpisodeToAir?: ITvEpisodeAir | null;
  numberOfEpisodes?: number;
  numberOfSeasons?: number;
  originalName: string;
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
