import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { API_URL } from "../api/config";
import type { Genre } from "./useMedia";

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await apiClient.get<Genre[]>(`${API_URL}/movies/genres`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
