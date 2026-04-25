import { create } from "zustand";

interface FilterMediaStore {
  selectedGenre: string;
  setSelectedGenre: (name: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

export const useFilterMedia = create<FilterMediaStore>((set) => ({
  selectedGenre: "",
  setSelectedGenre: (selectedGenre) => set({ selectedGenre }),
  selectedYear: "",
  setSelectedYear: (selectedYear) => set({ selectedYear }),
  selectedSort: "",
  setSelectedSort: (selectedSort) => set({ selectedSort }),
}));
