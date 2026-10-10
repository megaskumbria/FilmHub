import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { API_URL } from "../api/config";

export interface Country {
  iso31661: string;
  englishName: string;
  nativeName: string;
}

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
