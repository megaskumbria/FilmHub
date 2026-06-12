import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import axios from "axios";
import type { IMedia } from "../stores/movie-catalog";
import { MOVIE_CARD_PREVIEW_KEY } from "../storages/storage-keys";

export const useRandomPoster = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.get<IMedia>(`${API_URL}/random-poster`);
      return data;
    },
    onSuccess: ({
      backdropUrl,
      genres,
      id,
      originalTitle,
      originalName,
      overview,
      posterUrl,
      releaseDate,
      firstAirDate,
      voteAverage,
      ratingImdb,
    }) => {
      localStorage.setItem(
        MOVIE_CARD_PREVIEW_KEY,
        JSON.stringify({
          backdropUrl,
          genres,
          id,
          originalTitle,
          originalName,
          overview,
          posterUrl,
          releaseDate,
          firstAirDate,
          voteAverage,
          ratingImdb,
        }),
      );
    },
  });
};
