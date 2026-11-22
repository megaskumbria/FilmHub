"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFormatter, useTranslations } from "next-intl";
import { IconInfoCircle, IconLink, IconPlus, IconStarFilled } from "@tabler/icons-react";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import { TmdbMovie } from "@/shared/hooks/useMedia";
import { AddMovieCollectionMenu } from "@/features";
import { useRequireAuth } from "@/features/auth";
import { cn } from "@/shared/lib/utils";
import { getMediaTitles, getReleaseYears } from "@/shared/lib";

interface Props {
  movie: TmdbMovie;
  isUiHidden: boolean;
}

const getTitleSize = (length: number) => {
  if (length <= 10) return "text-6xl sm:text-8xl xl:text-9xl";
  if (length <= 22) return "text-5xl sm:text-7xl xl:text-8xl";
  return "text-4xl sm:text-5xl xl:text-6xl";
};

const rise = (index: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] as const },
});

export const MovieInfoPanel = ({ movie, isUiHidden }: Props) => {
  const t = useTranslations("movie");
  const format = useFormatter();
  const ensureAuth = useRequireAuth();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { genres, runtime, numberOfSeasons, mediaType, voteAverage, voteCount } = movie;

  const { localized, original } = getMediaTitles(movie);
  const isMovie = mediaType !== "tv";
  const subtitle = [original, getReleaseYears(movie)].filter(Boolean).join(", ");

  const formatDuration = (min: number) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return hours > 0 ? t("duration", { hours, minutes }) : t("minutes", { minutes });
  };

  const length =
    isMovie ?
      runtime > 0 && formatDuration(runtime)
    : numberOfSeasons && t("seasons", { count: numberOfSeasons });

  const handleOpenChange = (open: boolean) => {
    if (open && !ensureAuth()) return;
    setPopoverOpen(open);
  };

  return (
    <motion.div
      animate={{ opacity: isUiHidden ? 0 : 1, y: isUiHidden ? 16 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex max-w-4xl flex-col gap-7"
      inert={isUiHidden}
    >
      <motion.hgroup {...rise(0)}>
        <h1
          className={cn(
            "font-unbounded font-semibold text-white leading-[0.95] tracking-[-0.035em] text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]",
            getTitleSize(localized.length),
          )}
        >
          {localized}
        </h1>

        {subtitle && (
          <p className="mt-4 font-manrope text-lg font-medium text-white/60 sm:text-xl">
            {subtitle}
          </p>
        )}
      </motion.hgroup>

      <motion.div
        {...rise(1)}
        className="flex flex-wrap items-center gap-x-6 gap-y-3 font-manrope text-white/80"
      >
        {voteCount > 0 && (
          <p className="flex items-baseline gap-2">
            <IconStarFilled className="size-5 self-center text-gold" aria-hidden />
            <span className="font-unbounded text-2xl font-semibold text-white tabular-nums">
              {format.number(voteAverage, { maximumFractionDigits: 1, minimumFractionDigits: 1 })}
            </span>
            <span className="text-sm text-white/50">{t("votes", { count: voteCount })}</span>
          </p>
        )}

        {length && <p className="text-base font-semibold">{length}</p>}

        {genres.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={t("genres")}>
            {genres.map((genre) => (
              <li
                key={genre.id}
                className="rounded-full border border-white/20 px-3 py-1 text-sm font-medium text-white/80 first-letter:uppercase"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div {...rise(2)} className="flex flex-wrap gap-3">
        <AddMovieCollectionMenu
          open={popoverOpen}
          onOpenChange={handleOpenChange}
          mediaId={movie.id}
          mediaType="movie"
        >
          <Button variant="accent" size="lg" className="gap-2 rounded-full font-semibold text-sm">
            <IconPlus className="size-4" stroke={2.5} />
            <span>{t("addToCollection")}</span>
          </Button>
        </AddMovieCollectionMenu>

        <div className="flex h-10 items-stretch overflow-hidden rounded-full border border-white/15 bg-black/45 backdrop-blur-md">
          <Button className="h-full gap-2 pl-5 pr-4 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            <IconLink className="size-4" />
            <span>{t("generateLink")}</span>
          </Button>

          <span aria-hidden className="h-5 w-px shrink-0 self-center bg-white/15" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label={t("linkHint")}
                className="h-full w-11 shrink-0 cursor-default text-white/50 transition-colors hover:bg-white/10 hover:text-white/90"
              >
                <IconInfoCircle className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p className="text-sm">{t("linkHint")}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.div>
    </motion.div>
  );
};
