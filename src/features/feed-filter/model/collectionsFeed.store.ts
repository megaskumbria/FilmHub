import { create } from "zustand";

export type QuantitySortOption = "5" | "10" | "20" | "50" | "100" | "500" | "";
export type SortOption = "rating" | "views" | "likes" | "newest" | "oldest" | "";

interface SetFilterArgs {
  genreId?: string;
  sort?: SortOption;
  quantity?: QuantitySortOption;
}

interface Store {
  genreId: string;
  sort: SortOption;
  quantity: QuantitySortOption;

  setFilter: (args: SetFilterArgs) => void;
  resetFilter: () => void;
}

export const useCollectionsFeedStore = create<Store>((set) => ({
  genreId: "",
  sort: "",
  quantity: "",

  setFilter: (args: SetFilterArgs) => set(args),
  resetFilter: () => set({ genreId: "", sort: "", quantity: "" }),
}));
