import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { API_URL } from "../api/config";
import type { Country } from "./useMedia";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data } = await apiClient.get<Country[]>(`${API_URL}/movies/countries`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
