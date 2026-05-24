import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/constants";

export interface ICountry {
  iso31661: string;
  englishName: string;
  nativeName: string;
}

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data } = await axios.get<ICountry[]>(`${API_URL}/movies/countries`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
