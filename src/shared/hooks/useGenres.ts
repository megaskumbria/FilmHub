import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/constants";

export interface IGenre {
  id: string;
  name: string;
}

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await axios.get<IGenre[]>(`${API_URL}/movies/genres`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
