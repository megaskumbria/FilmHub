import { create } from "zustand";

export type QuantitySortOption = "5" | "10" | "20" | "50" | "100" | "500" | "";
export type SortOption = "rating" | "views" | "likes" | "newest" | "oldest" | "";

interface SetFilterArgs {
  genre?: string;
  sort?: SortOption;
  quantity?: QuantitySortOption;
}

interface Store {
  genre: string;
  sort: SortOption;
  quantity: QuantitySortOption;

  setFilter: (args: SetFilterArgs) => void;
  resetFilter: () => void;
}

export const useCollectionsFeedStore = create<Store>((set) => ({
  genre: "",
  sort: "",
  quantity: "",

  setFilter: (args: SetFilterArgs) =>
    set({ genre: args.genre, sort: args.sort, quantity: args.quantity }),
  resetFilter: () => set({ genre: "", sort: "", quantity: "" }),
}));
