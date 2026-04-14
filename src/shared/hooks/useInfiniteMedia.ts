import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { IMediaData } from "../model/stores/movie-catalog";
import { API_URL } from "../constants/constants";

export const useInfiniteMedia = (type: string, withGenres: string) => {
  // console.log(type, withGenres); // good

  return useInfiniteQuery({
    queryKey: ["media", type, withGenres],

    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get<IMediaData>(
        `${API_URL}/media?type=${type}&page=${pageParam}&with_genres=${withGenres}`,
      );
      return data;
    },

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage;

      if (page >= total_pages) return undefined;
      return page + 1;
    },

    staleTime: 1000 * 60 * 5, // кеш 5 минут
    initialPageParam: 1,
  });
};
