import { create } from "zustand";

export type MediaCategory = "all" | "movie" | "tv";
export type MediaType = "movie" | "tv";

export interface IMedia {
  yearOfRelease: number;
  titleToDisplay: string;

  adult: boolean;
  backdrop_url: string;
  genres: string[];
  id: number;
  original_language: string;
  original_title: string; // movie title
  original_name: string; // series title
  overview: string;
  popularity: number;
  poster_url: string;
  release_date: string; // movie release date
  first_air_date: string; // series release date
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  rating_imdb: string | null;

  media_type: MediaType;
}

export interface IMediaData {
  page: number;
  total_pages: number;
  media: IMedia[];
}

interface MediaCatalogStore {
  category: MediaCategory;
  setCategory: (category: MediaCategory) => void;
}

export const useMediaCatalog = create<MediaCatalogStore>((set) => ({
  category: "all",
  setCategory: (category) => set({ category }),
}));
