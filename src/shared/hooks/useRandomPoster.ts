import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import axios from "axios";
import type { Media } from "../stores/movie-catalog";

export const useRandomPoster = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.get<Media>(`${API_URL}/random-poster`);
      return data;
    },
  });
};
