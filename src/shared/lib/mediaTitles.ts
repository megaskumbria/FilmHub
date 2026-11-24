import type { CatalogListItem, MediaDetails } from "@/shared/hooks/useMedia";

type TitledMedia = MediaDetails | CatalogListItem;

export const getMediaTitles = (media: TitledMedia) => {
  const localized = "title" in media ? media.title : media.name;
  const original = "title" in media ? media.originalTitle : media.originalName;

  return { localized, original: original !== localized ? original : null };
};

const getYear = (date?: string | null) => {
  if (!date) return null;
  const year = new Date(date).getFullYear();
  return Number.isNaN(year) ? null : year;
};

export const getReleaseYears = (media: TitledMedia) => {
  const start = getYear("releaseDate" in media ? media.releaseDate : media.firstAirDate);

  if (!start) return null;
  return String(start);
};
