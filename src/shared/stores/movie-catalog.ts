import { create } from "zustand";

export type MediaCategory = "all" | "movie" | "tv";
export type MediaType = "movie" | "tv";

export interface Media {
  yearOfRelease: number;
  titleToDisplay: string;

  adult: boolean;
  backdropUrl: string;
  genres: string[];
  id: number;
  originalLanguage: string;
  originalTitle: string; // movie title
  originalName: string; // series title
  name: string; // movie title
  overview: string;
  popularity: number;
  posterUrl: string;
  releaseDate: string; // movie release date
  firstAirDate: string; // series release date
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;

  ratingImdb: string | null;

  mediaType: MediaType;
}

export interface MediaData {
  page: number;
  totalPages: number;
  media: Media[];
}

interface MediaCatalogStore {
  category: MediaCategory;
  setCategory: (category: MediaCategory) => void;
}

export const useMediaCatalog = create<MediaCatalogStore>((set) => ({
  category: "all",
  setCategory: (category) => set({ category }),
}));
