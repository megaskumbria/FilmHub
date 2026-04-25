import { create } from "zustand";

export type MediaCategory = "all" | "movie" | "tv";

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

  media_type: "movie" | "tv";
}

export interface IMediaData {
  page: number;
  total_pages: number;
  media: IMedia[];
}

interface MediaCatalogStore {
  category: MediaCategory;
  setCategory: (category: MediaCategory) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;

  selectedGenre: string;
  setSelectedGenre: (name: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

export const useMediaCatalog = create<MediaCatalogStore>((set) => ({
  category: "movie",
  setCategory: (category) => set({ category }),
  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  selectedGenre: "",
  setSelectedGenre: (selectedGenre) => set({ selectedGenre }),
  selectedYear: "",
  setSelectedYear: (selectedYear) => set({ selectedYear }),
  selectedSort: "",
  setSelectedSort: (selectedSort) => set({ selectedSort }),
}));
