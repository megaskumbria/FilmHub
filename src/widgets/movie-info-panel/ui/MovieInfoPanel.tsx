"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFormatter, useTranslations } from "next-intl";
import { IconPlus, IconStarFilled } from "@tabler/icons-react";
import { Button } from "@/shared/ui";
import { MediaDetails } from "@/shared/hooks/useMedia";
import { AddMovieCollectionMenu } from "@/features";
import { useRequireAuth } from "@/features/auth";
import { getMediaTitles, getReleaseYears } from "@/shared/lib";

interface Props {
  movie: MediaDetails;
  isUiHidden: boolean;
}

const rise = (index: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] as const },
});

export const MovieInfoPanel = ({ movie, isUiHidden }: Props) => {
  const t = useTranslations("movie");

  const [popoverOpen, setPopoverOpen] = useState(false);

  const format = useFormatter();
  const ensureAuth = useRequireAuth();

  const { genres, voteAverage, voteCount } = movie;

  const { localized, original } = getMediaTitles(movie);
  const years = getReleaseYears(movie);

  const formatDuration = (min: number) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return hours > 0 ? t("duration", { hours, minutes }) : t("minutes", { minutes });
  };

  const length =
    movie.mediaType === "movie" ?
      movie.runtime > 0 && formatDuration(movie.runtime)
    : movie.numberOfSeasons > 0 && t("seasons", { count: movie.numberOfSeasons });

  const releaseLine = [original, years, length].filter(Boolean).join(" · ");

  const handleOpenChange = (open: boolean) => {
    if (open && !ensureAuth()) return;
    setPopoverOpen(open);
  };

  return (
    <motion.div
      animate={{ opacity: isUiHidden ? 0 : 1, y: isUiHidden ? 16 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex max-w-4xl flex-col gap-4"
      inert={isUiHidden}
    >
      <motion.hgroup {...rise(0)}>
        <h1 className="text-4xl sm:text-5xl xl:text-6xl  font-unbounded font-semibold text-white leading-[0.95] tracking-[-0.035em] text-balance">
          {localized}
        </h1>

        {releaseLine && (
          <p className="mt-4 font-manrope text-lg font-medium text-white/60 sm:text-xl">
            {releaseLine}
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
          mediaType={movie.mediaType}
        >
          <Button variant="accent" size="lg" className="gap-2 rounded-full font-semibold text-sm">
            <IconPlus className="size-4" stroke={2.5} />
            <span>{t("addToCollection")}</span>
          </Button>
        </AddMovieCollectionMenu>
      </motion.div>
    </motion.div>
  );
};
