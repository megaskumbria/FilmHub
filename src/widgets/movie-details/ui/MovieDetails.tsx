"use client";

import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/shared/ui";
import { TmdbMovie } from "@/shared/hooks/useMedia";
import { capitalize, getMediaTitles } from "@/shared/lib";
import { ActorsCarousel } from "@/widgets/actors-carousel";

interface Props {
  movie: TmdbMovie;
}

const STATUS_KEYS: Record<string, string> = {
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

const splitParagraphs = (text: string) =>
  text
    .split(/\n+|\s{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export const MovieDetails = ({ movie }: Props) => {
  const t = useTranslations("movie");
  const format = useFormatter();
  const locale = useLocale();

  const {
    overview,
    tagline,
    posterUrl,
    backdropUrl,
    runtime,
    numberOfSeasons,
    numberOfEpisodes,
    status,
    originalLanguage,
    budget,
    revenue,
    imdbId,
    homepage,
    credits,
    mediaType,
  } = movie;

  const { localized } = getMediaTitles(movie);
  const isMovie = mediaType !== "tv";
  const releaseDate = movie.releaseDate || movie.firstAirDate;

  const formatMoney = (value: number) =>
    format.number(value, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
      trailingZeroDisplay: "stripIfInteger",
    });

  const languageName =
    originalLanguage && new Intl.DisplayNames([locale], { type: "language" }).of(originalLanguage);

  const facts = [
    releaseDate && {
      label: isMovie ? t("facts.release") : t("facts.firstAir"),
      value: format.dateTime(new Date(releaseDate), { dateStyle: "long" }),
    },
    isMovie
      && runtime > 0 && {
        label: t("facts.runtime"),
        value: t("minutes", { minutes: runtime }),
      },
    !isMovie
      && numberOfSeasons && {
        label: t("facts.seasons"),
        value: t("seasons", { count: numberOfSeasons }),
      },
    !isMovie
      && numberOfEpisodes && {
        label: t("facts.episodes"),
        value: format.number(numberOfEpisodes),
      },
    STATUS_KEYS[status] && {
      label: t("facts.status"),
      value: t(`status.${STATUS_KEYS[status]}`),
    },
    languageName && { label: t("facts.language"), value: capitalize(languageName) },
    budget > 0 && { label: t("facts.budget"), value: formatMoney(budget) },
    revenue > 0 && { label: t("facts.revenue"), value: formatMoney(revenue) },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  const links = [
    imdbId && { label: t("imdb"), href: `https://www.imdb.com/title/${imdbId}` },
    homepage && { label: t("homepage"), href: homepage },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  const paragraphs = splitParagraphs(overview ?? "");

  return (
    <section aria-labelledby="movie-story" className="relative isolate overflow-hidden">
      {backdropUrl && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={backdropUrl}
            alt=""
            fill
            sizes="50vw"
            className="scale-125 object-cover opacity-30 blur-3xl saturate-150"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background via-background/85 to-background" />
        </div>
      )}

      <div className="mx-auto grid max-w-350 gap-x-14 gap-y-16 px-6 pt-10 pb-24 md:grid-cols-[12rem_minmax(0,1fr)] lg:px-14 xl:grid-cols-[15rem_minmax(0,1fr)_17rem]">
        <aside className="hidden md:row-span-2 md:block xl:row-span-1">
          <div className="sticky top-24 flex flex-col gap-4">
            {posterUrl && (
              <div className="relative aspect-2/3 overflow-hidden rounded-lg shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
                <Image
                  src={posterUrl}
                  alt={localized}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            )}

            {links.map(({ label, href }) => (
              <Button
                key={href}
                asChild
                variant="glass"
                size="sm"
                className="justify-between rounded-full px-4 font-manrope text-sm font-semibold"
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                  <IconExternalLink className="size-4 text-white/50" />
                </a>
              </Button>
            ))}
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-16">
          <article className="max-w-[64ch]">
            <h2 id="movie-story" className="mb-6 font-unbounded text-lg font-medium text-white">
              {t("story")}
            </h2>

            {tagline && (
              <p className="mb-8 font-unbounded text-2xl font-medium leading-tight text-white text-balance sm:text-3xl">
                {tagline}
              </p>
            )}

            {paragraphs.length > 0 ?
              <div className="flex flex-col gap-4 font-manrope text-lg leading-relaxed text-white/75">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            : <p className="font-manrope text-lg text-white/50">{t("noOverview")}</p>}
          </article>

          <ActorsCarousel actors={credits.cast} />
        </div>

        {facts.length > 0 && (
          <aside
            aria-labelledby="movie-facts"
            className="md:col-start-2 xl:col-start-3 xl:row-start-1"
          >
            <h2 id="movie-facts" className="mb-4 font-unbounded text-lg font-medium text-white">
              {t("details")}
            </h2>

            <dl className="font-manrope text-sm">
              {facts.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 border-b border-white/10 py-3.5"
                >
                  <dt className="text-zinc-muted">{label}</dt>
                  <dd className="text-right font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>
    </section>
  );
};
