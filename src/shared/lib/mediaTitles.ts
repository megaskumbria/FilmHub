import type { TmdbMovie } from "@/shared/hooks/useMedia";

export const getMediaTitles = (media: TmdbMovie) => {
  const localized = media.title || media.name || media.originalTitle || media.originalName || "";
  const original = media.originalTitle || media.originalName || "";

  return { localized, original: original !== localized ? original : null };
};

const getYear = (date?: string | null) => (date ? new Date(date).getFullYear() : null);

export const getReleaseYears = (media: TmdbMovie) => {
  const start = getYear(media.releaseDate || media.firstAirDate);
  const end = media.status === "Ended" ? getYear(media.lastAirDate) : null;

  if (!start) return null;
  return end && end !== start ? `${start}–${end}` : String(start);
};
