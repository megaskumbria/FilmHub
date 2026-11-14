import { create } from "zustand";

interface SetFilterArgs {
  genreId?: string;
  sort?: string;
  quantity?: string;
}

interface Store {
  genreId: string;
  sort: string;
  quantity: string;

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
