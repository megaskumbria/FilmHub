import { Clapperboard, Film, Smile, Tv } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ContentType = "movie" | "series" | "cartoon" | "cartoon-series";

export const CONTENT_TYPES: { value: ContentType; label: string; icon: LucideIcon }[] = [
  { value: "movie", label: "Фильм", icon: Film },
  { value: "series", label: "Сериал", icon: Tv },
  { value: "cartoon", label: "Мультфильм", icon: Smile },
  { value: "cartoon-series", label: "Мультсериал", icon: Clapperboard },
];

export const GENRES = [
  "Экшн",
  "Комедия",
  "Драма",
  "Ужасы",
  "Триллер",
  "Фантастика",
  "Фэнтези",
  "Мелодрама",
  "Анимация",
  "Документальный",
  "Биография",
  "Криминал",
  "Приключения",
  "Мистика",
  "Семейный",
  "Исторический",
];

export const AGE_RATINGS = ["0+", "6+", "12+", "16+", "18+"];
