import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../api/config";

export interface Genre {
  id: string;
  name: string;
}

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await axios.get<Genre[]>(`${API_URL}/movies/genres`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
