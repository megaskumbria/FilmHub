import type { useFormatter, useTranslations } from "next-intl";
import { capitalize } from "@/shared/lib";
import type { MediaDetails, MediaDetailsMovie } from "@/shared/hooks/useMedia";

type Translator = ReturnType<typeof useTranslations<"movie">>;
type Formatter = ReturnType<typeof useFormatter>;

export interface MovieFact {
  label: string;
  value: string;
}

interface FactContext {
  t: Translator;
  format: Formatter;
  locale: string;
}

const STATUS_KEYS = {
  Released: "released",
  Ended: "ended",
  "Returning Series": "returning",
  "In Production": "inProduction",
  "Post Production": "postProduction",
  Planned: "planned",
  Canceled: "canceled",
  Rumored: "rumored",
  Pilot: "pilot",
};

type FactKey = "release" | "runtime" | "seasons" | "status" | "language" | "budget" | "revenue";

const isMovie = (movie: MediaDetails): movie is MediaDetailsMovie => movie.mediaType === "movie";

const formatMoney = (format: Formatter, value: number) =>
  format.number(value, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    trailingZeroDisplay: "stripIfInteger",
  });

const factByKey: Record<FactKey, (movie: MediaDetails, ctx: FactContext) => MovieFact | null> = {
  release: (movie, { t, format }) => {
    const releaseDate = isMovie(movie) ? movie.releaseDate : movie.firstAirDate;
    if (!releaseDate) return null;

    return {
      label: isMovie(movie) ? t("facts.release") : t("facts.firstAir"),
      value: format.dateTime(new Date(releaseDate), { dateStyle: "long" }),
    };
  },
  runtime: (movie, { t }) =>
    isMovie(movie) && movie.runtime > 0 ?
      { label: t("facts.runtime"), value: t("minutes", { minutes: movie.runtime }) }
    : null,
  seasons: (movie, { t }) =>
    !isMovie(movie) && movie.numberOfSeasons > 0 ?
      { label: t("facts.seasons"), value: t("seasons", { count: movie.numberOfSeasons }) }
    : null,
  status: (movie, { t }) => {
    const statusKey = STATUS_KEYS[movie.status as keyof typeof STATUS_KEYS];
    if (!statusKey) return null;

    return { label: t("facts.status"), value: t(`status.${statusKey}`) };
  },
  language: (movie, { t, locale }) => {
    if (!movie.originalLanguage) return null;

    const languageName = new Intl.DisplayNames([locale], { type: "language" }).of(
      movie.originalLanguage,
    );
    if (!languageName) return null;

    return { label: t("facts.language"), value: capitalize(languageName) };
  },
  budget: (movie, { t, format }) =>
    isMovie(movie) && movie.budget > 0 ?
      { label: t("facts.budget"), value: formatMoney(format, movie.budget) }
    : null,
  revenue: (movie, { t, format }) =>
    isMovie(movie) && movie.revenue > 0 ?
      { label: t("facts.revenue"), value: formatMoney(format, movie.revenue) }
    : null,
};

const FACT_KEYS: FactKey[] = [
  "release",
  "runtime",
  "seasons",
  "status",
  "language",
  "budget",
  "revenue",
];

export const getMovieFacts = (movie: MediaDetails, ctx: FactContext) =>
  FACT_KEYS.flatMap((key) => {
    const fact = factByKey[key](movie, ctx);
    return fact ? [fact] : [];
  });
