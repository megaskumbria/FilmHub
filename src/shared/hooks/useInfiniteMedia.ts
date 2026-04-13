import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { IMediaData } from "../model/stores/movie-catalog";
import { API_URL } from "../constants/constants";

export const useInfiniteMedia = (type: string) => {
  return useInfiniteQuery({
    queryKey: ["media", type],

    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get<IMediaData>(
        `${API_URL}/media?type=${type}&page=${pageParam}`,
      );
      return data;
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) return undefined;
      return lastPage.page + 1;
    },

    staleTime: 1000 * 60 * 5, // кеш 5 минут
    initialPageParam: 1,
  });
};
