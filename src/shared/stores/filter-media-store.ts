import { create } from "zustand";
import { IGenre } from "@/shared/hooks/useGenres";

interface FilterMediaStore {
  selectedGenre: IGenre;
  setSelectedGenre: ({ id, name }: IGenre) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

export const useFilterMedia = create<FilterMediaStore>((set) => ({
  selectedGenre: { id: "", name: "" },
  setSelectedGenre: ({ id, name }: IGenre) => set({ selectedGenre: { id, name } }),
  selectedYear: "",
  setSelectedYear: (selectedYear) => set({ selectedYear }),
  selectedSort: "",
  setSelectedSort: (selectedSort) => set({ selectedSort }),
}));
