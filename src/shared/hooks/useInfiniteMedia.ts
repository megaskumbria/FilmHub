import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { type MediaData, type MediaCategory } from "../stores/movie-catalog";
import { API_URL } from "../api/config";
import { FilterSortType, FilterYearType } from "@/features/media-filters";
import { apiClient } from "../api/api-client";

interface UseInfiniteMediaArgs {
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
}: UseInfiniteMediaArgs) => {
  const locale = useLocale();

  return useInfiniteQuery({
    queryKey: [
      "media",
      {
        category,
        searchQuery,
        selectedGenre,
        selectedSort,
        selectedYear,
        selectedCountry,
        locale,
      },
    ],

    queryFn: async ({ pageParam = 1, signal }) => {
      const { data } = await apiClient.get<MediaData>(
        `${API_URL}/movies?media_type=${category}&page=${pageParam}&query=${searchQuery}&with_genres=${selectedGenre}&sort=${selectedSort}&year=${selectedYear}&country=${selectedCountry}&language=${locale}`,
        { signal },
      );
      return data;
    },

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      if (page >= totalPages) return undefined;
      return page + 1;
    },

    enabled,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });
};
