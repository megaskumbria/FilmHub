import { infiniteQueryOptions } from "@tanstack/react-query";
import { type MediaData, type MediaCategory } from "../stores/movie-catalog";
import { API_URL } from "../api/config";
import { FilterSortType, FilterYearType } from "@/features/media-filters";
import { apiClient } from "../api/api-client";

interface InfiniteMediaQueryOptionsArgs {
  category: MediaCategory;
  searchQuery?: string;
  selectedGenre?: string;
  selectedSort?: FilterSortType;
  selectedYear?: FilterYearType;
  selectedCountry?: string;

  enabled?: boolean;

  scope?: string;
  token?: string;
}

export const infiniteMediaQueryOptions = ({
  category,
  searchQuery = "",
  selectedGenre = "",
  selectedSort = "",
  selectedYear = "",
  selectedCountry = "",
  enabled = true,
  scope = "catalog",
  token,
}: InfiniteMediaQueryOptionsArgs) => {
  return infiniteQueryOptions({
    queryKey: [
      "media",
      scope,
      {
        category,
        searchQuery,
        selectedGenre,
        selectedSort,
        selectedYear,
        selectedCountry,
      },
    ],

    queryFn: async ({ pageParam = 1, signal }) => {
      const { data } = await apiClient.get<MediaData>(
        `${API_URL}/movies?media_type=${category}&page=${pageParam}&query=${searchQuery}&with_genres=${selectedGenre}&sort=${selectedSort}&year=${selectedYear}&country=${selectedCountry}`,
        {
          signal,
          ...(token ? { headers: { Cookie: `accessToken=${token}` } } : {}),
        },
      );
      return data;
    },

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      if (page >= totalPages) return undefined;
      return page + 1;
    },

    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};
