import { Clapperboard, Film, Smile, Tv } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ContentType = "movie" | "series" | "cartoon" | "cartoon-series";

export const CONTENT_TYPES: { value: ContentType; label: string; icon: LucideIcon }[] = [
  { value: "movie", label: "Movie", icon: Film },
  { value: "series", label: "Series", icon: Tv },
  { value: "cartoon", label: "Animation", icon: Smile },
  { value: "cartoon-series", label: "Animated series", icon: Clapperboard },
];

export const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Thriller",
  "Sci-Fi",
  "Fantasy",
  "Romance",
  "Animation",
  "Documentary",
  "Biography",
  "Crime",
  "Adventure",
  "Mystery",
  "Family",
  "Historical",
];

export const AGE_RATINGS = ["0+", "6+", "12+", "16+", "18+"];
