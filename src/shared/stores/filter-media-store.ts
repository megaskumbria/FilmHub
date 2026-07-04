import { create } from "zustand";
import { Genre } from "@/shared/hooks/useGenres";
import { Country } from "../hooks/useCountries";

export type FilterSortType = "rating" | "newest" | "oldest" | "az" | "za" | "";
export type FilterYearType =
  | "before-1990"
  | "1990-2000"
  | "2000-2010"
  | "2010-2020"
  | "2020-today"
  | "";

interface FilterMediaStore {
  selectedGenre: Genre;
  setSelectedGenre: ({ id, name }: Genre) => void;

  selectedYear: FilterYearType;
  setSelectedYear: (year: FilterYearType) => void;

  selectedSort: FilterSortType;
  setSelectedSort: (sort: FilterSortType) => void;

  selectedCountry: Country;
  setSelectedCountry: ({ iso31661, englishName, nativeName }: Country) => void;

  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;

  isFrozenFilterCountry: boolean;
  setFrozenFilterCountry: (isFrozenFilterCountry: boolean) => void;
}

export const useFilterMedia = create<FilterMediaStore>((set) => ({
  selectedGenre: { id: "", name: "" },
  setSelectedGenre: ({ id, name }: Genre) => set({ selectedGenre: { id, name } }),

  selectedYear: "",
  setSelectedYear: (selectedYear) => set({ selectedYear }),

  selectedSort: "",
  setSelectedSort: (selectedSort) => set({ selectedSort }),

  selectedCountry: { iso31661: "", englishName: "", nativeName: "" },
  setSelectedCountry: ({ iso31661, englishName, nativeName }: Country) =>
    set({ selectedCountry: { iso31661, englishName, nativeName } }),

  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  isFrozenFilterCountry: false,
  setFrozenFilterCountry: (isFrozenFilterCountry) => set({ isFrozenFilterCountry }),
}));
