import { create } from "zustand";
import { IGenre } from "@/shared/hooks/useGenres";
import { ICountry } from "../hooks/useCountries";

export type FilterSortType = "rating" | "newest" | "oldest" | "az" | "za" | "";
export type FilterYearType =
  | "before-1990"
  | "1990-2000"
  | "2000-2010"
  | "2010-2020"
  | "2020-today"
  | "";

interface FilterMediaStore {
  selectedGenre: IGenre;
  setSelectedGenre: ({ id, name }: IGenre) => void;

  selectedYear: FilterYearType;
  setSelectedYear: (year: FilterYearType) => void;

  selectedSort: FilterSortType;
  setSelectedSort: (sort: FilterSortType) => void;

  selectedCountry: ICountry;
  setSelectedCountry: ({ iso_3166_1, english_name, native_name }: ICountry) => void;

  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;

  isFrozenFilterCountry: boolean;
  setFrozenFilterCountry: (isFrozenFilterCountry: boolean) => void;
}

export const useFilterMedia = create<FilterMediaStore>((set) => ({
  selectedGenre: { id: "", name: "" },
  setSelectedGenre: ({ id, name }: IGenre) => set({ selectedGenre: { id, name } }),

  selectedYear: "",
  setSelectedYear: (selectedYear) => set({ selectedYear }),

  selectedSort: "",
  setSelectedSort: (selectedSort) => set({ selectedSort }),

  selectedCountry: { iso_3166_1: "", english_name: "", native_name: "" },
  setSelectedCountry: ({ iso_3166_1, english_name, native_name }: ICountry) =>
    set({ selectedCountry: { iso_3166_1, english_name, native_name } }),

  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  isFrozenFilterCountry: false,
  setFrozenFilterCountry: (isFrozenFilterCountry) => set({ isFrozenFilterCountry }),
}));
