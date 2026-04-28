import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/constants";

export interface ICountry {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
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
