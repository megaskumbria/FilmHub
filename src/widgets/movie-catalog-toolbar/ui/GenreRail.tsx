"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Button, FilmPerforation, Skeleton } from "@/shared/ui";
import { useGenres } from "@/shared/hooks";
import { useFilterMedia } from "@/features";
import { useTranslations } from "next-intl";
import { capitalize } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import "swiper/css";
import "swiper/css/free-mode";

const ALL_GENRES = { id: "", name: "" };

const FADE_MASK =
  "linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 48px), transparent 100%)";

export const GenreRail = () => {
  const t = useTranslations("catalog");
  const { data: dataGenres = [], isLoading } = useGenres();
  const { selectedGenre, setSelectedGenre } = useFilterMedia();

  const genres = [{ ...ALL_GENRES, name: t("allGenres") }, ...dataGenres];

  return (
    <nav className="relative rounded-xl border border-border/40 bg-surface-subtle py-1.5">
      <FilmPerforation className="opacity-70" />

      {isLoading ?
        <div
          className="flex gap-1.5 overflow-hidden px-3 py-2"
          style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-lg" />
          ))}
        </div>
      : <Swiper
          modules={[FreeMode]}
          freeMode
          grabCursor
          spaceBetween={6}
          slidesPerView="auto"
          className="px-3 py-2"
          style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
        >
          {genres.map((genre) => {
            const isActive = selectedGenre.id === genre.id;

            return (
              <SwiperSlide key={genre.id || "all"} className="w-auto!">
                <Button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedGenre(genre)}
                  className={cn(
                    "group relative h-9 rounded-lg px-4 transition-colors duration-200",
                    !isActive && "hover:bg-graphite",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeGenre"
                      aria-hidden
                      className="absolute inset-0 rounded-lg bg-linear-to-br from-accent to-accent/75 shadow-md shadow-accent/25"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}

                  <span
                    className={cn(
                      "relative z-10 whitespace-nowrap text-sm font-medium transition-colors",
                      isActive ? "text-accent-foreground" : (
                        "text-zinc-muted group-hover:text-foreground"
                      ),
                    )}
                  >
                    {capitalize(genre.name)}
                  </span>
                </Button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      }

      <FilmPerforation className="opacity-70" />
    </nav>
  );
};
