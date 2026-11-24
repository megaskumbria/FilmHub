"use client";

import { useState, useMemo } from "react";
import { getMediaTitles } from "@/shared/lib";
import { MediaDetails } from "@/shared/hooks/useMedia";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MovieInfoPanel, PosterCarousel } from "@/widgets";
import { Button } from "@/shared/ui";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface Props {
  movie: MediaDetails;
}

export const MoviePageClient = ({ movie }: Props) => {
  const t = useTranslations("movie");

  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [isUiHidden, setIsUiHidden] = useState<boolean>(false);

  const frames = useMemo<string[]>(() => {
    if (!movie?.backdropUrl) return [];
    return movie.stillsReady ? [movie.backdropUrl, ...movie.stills] : [movie.backdropUrl];
  }, [movie]);

  const { localized } = getMediaTitles(movie);

  const frame = frames[frameIndex] ?? movie.backdropUrl;
  const hasFilmStrip = frames.length > 1;

  return (
    <section className="relative overflow-hidden h-svh min-h-160">
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={frame}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {frame && (
              <Image
                src={frame}
                alt={localized}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        aria-hidden
        animate={{ opacity: isUiHidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background/70 via-background/40 to-transparent" />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />

      <div
        className={cn(
          "relative grid h-full grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto] gap-8 px-6 pt-24 pb-10 lg:grid-rows-1 lg:gap-14 lg:px-14 lg:pb-14",
          hasFilmStrip ? "lg:grid-cols-[minmax(0,1fr)_11rem]" : "lg:grid-cols-[minmax(0,1fr)_auto]",
        )}
      >
        <div className="flex min-w-0 flex-col justify-end">
          <MovieInfoPanel movie={movie} isUiHidden={isUiHidden} />
        </div>

        <aside className="flex min-h-0 flex-col justify-end gap-4">
          {hasFilmStrip && (
            <PosterCarousel
              frames={frames}
              activeIndex={frameIndex}
              onSelect={setFrameIndex}
              titleToDisplay={localized}
            />
          )}

          <Button
            variant="glass"
            size="sm"
            onClick={() => setIsUiHidden((hidden) => !hidden)}
            className="gap-2 self-end rounded-full px-3.5 font-manrope text-xs font-semibold text-white/80 hover:text-white lg:self-stretch"
          >
            {isUiHidden ?
              <IconEye className="size-4" />
            : <IconEyeOff className="size-4" />}
            <span>{isUiHidden ? t("showUi") : t("posterOnly")}</span>
          </Button>
        </aside>
      </div>
    </section>
  );
};
