import { queryOptions } from "@tanstack/react-query";
import { API_URL } from "../api/config";

export type MediaType = "movie" | "tv" | "all";

export interface Genre {
  id: number;
  name: string;
}

export type GenreList = Genre[];

export interface Country {
  iso31661: string;
  englishName: string;
  nativeName: string;
}

export type CountryList = Country[];

export interface CatalogListItemMovie {
  id: number;
  adult: boolean;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  mediaType: MediaType;
  genres: string[];
  posterUrl: string | null;
  backdropUrl: string | null;
  ratingImdb?: number;
}

export interface CatalogListItemTv {
  id: number;
  name: string;
  originalLanguage: string;
  originalName: string;
  overview: string;
  popularity: number;
  firstAirDate: string;
  voteAverage: number;
  voteCount: number;
  ratingImdb?: number;
  mediaType: MediaType;
  genres: string[];
  posterUrl: string | null;
  backdropUrl: string | null;
}

export type CatalogListItem = CatalogListItemMovie | CatalogListItemTv;

export interface MediaPage {
  media: CatalogListItem[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string | null;
  profileUrl: string | null;
  castId: number;
  character: string;
  creditId: string;
  order: number;
}

export interface MovieCredits {
  cast: CastMember[];
}

interface MediaDetailsBase {
  id: number;
  adult: boolean;
  backdropUrl: string | null;
  genres: Genre[];
  homepage: string;
  imdbId: string | null;
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterUrl: string | null;
  status: string;
  tagline: string;
  voteAverage: number;
  voteCount: number;
  mediaType: "movie" | "tv";
  stills: string[];
  stillsReady: boolean;
  credits: MovieCredits;
}

export interface MediaDetailsMovie extends MediaDetailsBase {
  mediaType: "movie";
  title: string;
  originalTitle: string;
  releaseDate: string;
  video: boolean;
  budget: number;
  revenue: number;
  runtime: number;
}

export interface MediaDetailsTv extends MediaDetailsBase {
  mediaType: "tv";
  name: string;
  originalName: string;
  firstAirDate: string;
  numberOfSeasons: number;
}

export type MediaDetails = MediaDetailsMovie | MediaDetailsTv;

export const movieQueryOptions = (id: number, mediaType: "movie" | "tv", locale: string) =>
  queryOptions({
    queryKey: ["movie", id, mediaType, locale],
    queryFn: async () => {
      console.log(`${API_URL}/movies/movie/${id}?media_type=${mediaType}&language=${locale}`);

      const response = await fetch(
        `${API_URL}/movies/movie/${id}?media_type=${mediaType}&language=${locale}`,
        { headers: { "Accept-Language": locale }, next: { revalidate: 60 * 60 } },
      );
      if (!response.ok) throw new Error("Failed to load movie");
      return response.json() as Promise<MediaDetails>;
    },
    staleTime: 1000 * 60 * 60,
  });
