export type ContentType = "movie" | "series" | "cartoon" | "cartoon-series";

export const CONTENT_TYPES: { value: ContentType; label: string; emoji: string }[] = [
  { value: "movie", label: "Фильм", emoji: "🎬" },
  { value: "series", label: "Сериал", emoji: "📺" },
  { value: "cartoon", label: "Мультфильм", emoji: "🎨" },
  { value: "cartoon-series", label: "Мультсериал", emoji: "✨" },
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
