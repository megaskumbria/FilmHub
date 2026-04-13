import { create } from "zustand";

export type MediaType = "movie" | "tv" | "cartoons";

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
}

export interface IMediaData {
  page: number;
  total_pages: number;
  media: IMedia[];
}

interface MediaCatalogStore {
  activeType: MediaType;
  setActiveType: (type: MediaType) => void;
  mediaData: IMediaData | null;
  setMediaData: (
    updater: IMediaData | null | ((prev: IMediaData | null) => IMediaData | null),
  ) => void;
  // setMediaData: (mediaData: IMediaData | null) => void;
}

export const useMediaCatalog = create<MediaCatalogStore>()((set) => ({
  activeType: "movie",
  setActiveType: (activeType) => set({ activeType }),
  mediaData: null,
  // setMediaData: (mediaData) => set({ mediaData }),
  setMediaData: (updater) =>
    set((state) => ({
      mediaData: typeof updater === "function" ? updater(state.mediaData) : updater,
    })),
}));
