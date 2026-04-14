import { MediaCategory } from "../model/stores/movie-catalog";

export const mapCategoryToTmdb = (category: MediaCategory) => {
  switch (category) {
    case "animation_movie":
      return { type: "movie", withGenres: "16" };
    case "animation_tv":
      return { type: "tv", withGenres: "16" };
    default:
      return { type: category, withGenres: "" };
  }
};
