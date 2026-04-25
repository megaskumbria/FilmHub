import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { IMediaData, MediaCategory } from "../stores/movie-catalog";
import { API_URL } from "../constants/constants";

export const useInfiniteMedia = (
  searchQuery: string,
  category: MediaCategory,
  selectedGenre: string,
) => {
  return useInfiniteQuery({
    queryKey: ["media", category, searchQuery, selectedGenre],

    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get<IMediaData>(
        `${API_URL}/movies?type=${category}&page=${pageParam}&query=${searchQuery}&with_genres=${selectedGenre}`,
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

    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });
};
