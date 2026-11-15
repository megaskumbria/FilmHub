"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Button, FilmPerforation, Skeleton } from "@/shared/ui";
import { useGenres } from "@/shared/hooks";
import { useFilterMedia } from "@/features";
import { useTranslations } from "next-intl";
import { capitalize } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import "swiper/css";
import "swiper/css/free-mode";

const ALL_GENRES = { id: "", name: "" };

const FADE_START = "transparent 0, #000 40px";
const FADE_END = "#000 calc(100% - 64px), transparent 100%";

const getFadeMask = (isBeginning: boolean, isEnd: boolean) => {
  const start = isBeginning ? "#000 0" : FADE_START;
  const end = isEnd ? "#000 100%" : FADE_END;

  return `linear-gradient(90deg, ${start}, ${end})`;
};

export const GenreRail = () => {
  const t = useTranslations("catalog");
  const { data: dataGenres = [], isLoading } = useGenres();
  const { selectedGenre, setSelectedGenre } = useFilterMedia();

  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const genres = [{ ...ALL_GENRES, name: t("allGenres") }, ...dataGenres];
  const fadeMask = getFadeMask(isBeginning, isEnd);

  const updateEdges = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <nav className="relative rounded-xl border border-border/40 bg-surface-subtle py-1.5">
      <FilmPerforation className="opacity-70" />

      {isLoading ?
        <div
          className="flex gap-1.5 overflow-hidden px-3 py-2"
          style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-lg" />
          ))}
        </div>
      : <div className="relative">
          <Button
            variant="rounded"
            tabIndex={isBeginning ? -1 : 0}
            onClick={() => swiperRef.current?.slidePrev()}
            className={cn(
              "size-9 absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 transition-opacity duration-200 md:flex",
              isBeginning && "pointer-events-none opacity-0",
            )}
          >
            <IconChevronLeft className="size-5" />
          </Button>

          <Swiper
            modules={[FreeMode, Mousewheel]}
            freeMode
            grabCursor
            mousewheel={{ forceToAxis: true }}
            spaceBetween={6}
            slidesPerView="auto"
            slidesPerGroupAuto
            className="px-3 py-2"
            style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateEdges(swiper);
            }}
            onProgress={updateEdges}
            onResize={updateEdges}
            onUpdate={updateEdges}
          >
            {genres.map((genre) => {
              const isActive = selectedGenre.id === genre.id;

              return (
                <SwiperSlide key={genre.id || "all"} className="w-auto!">
                  <Button
                    type="button"
                    onClick={() => setSelectedGenre(genre)}
                    className={cn(
                      "group relative h-9 rounded-lg px-4 transition-colors duration-200",
                      !isActive && "hover:bg-graphite",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeGenre"
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

          <Button
            variant="rounded"
            tabIndex={isEnd ? -1 : 0}
            onClick={() => swiperRef.current?.slideNext()}
            className={cn(
              "size-9 absolute top-1/2 right-2 z-10 hidden -translate-y-1/2 transition-opacity duration-200 md:flex",
              isEnd && "pointer-events-none opacity-0",
            )}
          >
            <IconChevronRight className="size-5" />
          </Button>
        </div>
      }

      <FilmPerforation className="opacity-70" />
    </nav>
  );
};
