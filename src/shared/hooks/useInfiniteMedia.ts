import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { IMediaData, MediaCategory } from "../stores/movie-catalog";
import { API_URL } from "../constants/constants";
import { FilterSortType, FilterYearType } from "../stores/filter-media-store";

interface UseInfiniteMediaProps {
  category: MediaCategory;
  searchQuery?: string;
  selectedGenre?: string;
  selectedSort?: FilterSortType;
  selectedYear?: FilterYearType;
  selectedCountry?: string;
  enabled?: boolean;
}

export const useInfiniteMedia = ({
  category,
  searchQuery = "",
  selectedGenre = "",
  selectedSort = "",
  selectedYear = "",
  selectedCountry = "",
  enabled = true,
}: UseInfiniteMediaProps) => {
  return useInfiniteQuery({
    queryKey: [
      "media",
      category,
      searchQuery,
      selectedGenre,
      selectedSort,
      selectedYear,
      selectedCountry,
    ],

    queryFn: async ({ pageParam = 1, signal }) => {
      const { data } = await axios.get<IMediaData>(
        `${API_URL}/movies?type=${category}&page=${pageParam}&query=${searchQuery}&with_genres=${selectedGenre}&sort=${selectedSort}&year=${selectedYear}&country=${selectedCountry}`,
        // { signal: AbortSignal.timeout(10000) }, // if request takes more than 10 seconds, it will be cancelled
        { signal }, // cancel request if called new one
      );
      return data;
    },

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage;
      // console.log("page", page);
      // console.log("total_pages", total_pages);
      // console.log("page >= total_pages", page >= total_pages);
      if (page >= total_pages) return undefined;
      return page + 1;
    },

    enabled,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });
};
