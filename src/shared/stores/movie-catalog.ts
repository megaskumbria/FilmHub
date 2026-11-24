import { create } from "zustand";
import { type FlagData } from "@/shared/hooks";
import type { CatalogListItem } from "@/shared/hooks/useMedia";

export type MediaCategory = "all" | "movie" | "tv";
export type MediaType = "movie" | "tv";

export type Media = CatalogListItem & {
  mediaFlags?: FlagData[];
  titleToDisplay?: string;
  yearOfRelease?: number;
};

interface MediaCatalogStore {
  category: MediaCategory;
  setCategory: (category: MediaCategory) => void;
}

export const useMediaCatalog = create<MediaCatalogStore>((set) => ({
  category: "all",
  setCategory: (category) => set({ category }),
}));
