"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, LayoutGrid, LayoutList } from "lucide-react";
import {
  IconStack2,
  IconStarFilled,
  IconEye,
  IconHeartFilled,
  IconFlame,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { mockMovies, type IMovieCardData } from "@/shared/model/movies";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { FilterPopover } from "@/widgets/movie-catalog-toolbar";

const CARD_W = 220;
const CARD_H = Math.round(CARD_W * (3 / 2));
const TRENDING_LIKES_THRESHOLD = 2000;

interface CollectionCardData {
  id: number;
  label: string;
  genres: string[];
  rating: number;
  views: string;
  likes: number;
  movies: IMovieCardData[];
}

// Stack visual constants
const STACK_RESERVE_X = 28;
const STACK_RESERVE_Y = 24;
const TOP_REVEAL_BACK = 10;
const TOP_REVEAL_MID = 6;

const restingPositions = [
  { x: 0, y: 0, rotate: 0 },
  { x: 6, y: -TOP_REVEAL_MID, rotate: 1.5 },
  { x: 12, y: -TOP_REVEAL_BACK, rotate: 3 },
] as const;

const hoveredPositions = [
  { x: 0, y: -10, rotate: 0 },
  { x: 42, y: 8, rotate: 8 },
  { x: -36, y: 12, rotate: -8 },
] as const;

interface StackPosterProps {
  movie: IMovieCardData;
  isTop: boolean;
  filmsCount: number;
  rating: number;
  hovered: boolean;
}

const StackPoster = ({ movie, isTop, filmsCount, rating, hovered }: StackPosterProps) => (
  <div
    className={cn(
      "relative w-full overflow-hidden rounded-xl border",
      isTop && "border-white/15 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)]",
      !isTop && "border-white/8 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.65)]",
    )}
    style={{ height: CARD_H }}
  >
    <Image
      src={movie.imgUrl}
      alt={movie.title}
      width={CARD_W}
      height={CARD_H}
      className={cn(
        "w-full h-full object-cover transition-[transform,filter] duration-500",
        isTop && hovered && "scale-[1.04]",
        !isTop && "brightness-[0.6] saturate-[0.9]",
      )}
    />

    {/* Subtle inner vignette for depth */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_55%,rgba(0,0,0,0.45)_100%)]"
    />

    {/* Top reflective edge — gives the card a "surface" feel */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"
    />

    {/* Accent tint for the underlying cards — visually binds the stack */}
    {!isTop && (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/22 via-transparent to-accent/8 mix-blend-overlay"
      />
    )}

    {isTop && (
      <>
        {/* Top-left corner sheen — paper-like highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-8 size-28 rounded-full bg-white/10 blur-2xl"
        />

        {/* Rating pill — top-left */}
        <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 ring-1 ring-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          <IconStarFilled className="size-3 text-gold" />
          <span className="text-xs font-semibold leading-none text-foreground">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Films counter — top-right */}
        <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 ring-1 ring-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          <IconStack2 className="size-3 text-accent" />
          <span className="text-xs font-semibold leading-none text-foreground">{filmsCount}</span>
        </div>

        {/* Bottom gradient revealed only on hover */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300",
            hovered && "opacity-100",
            !hovered && "opacity-0",
          )}
        />
      </>
    )}
  </div>
);

const CollectionDeck = ({
  id,
  label,
  genres,
  rating,
  views,
  likes,
  movies,
}: CollectionCardData) => {
  const [hovered, setHovered] = useState(false);

  const top3 = movies.slice(0, 3);
  const positions = hovered ? hoveredPositions : restingPositions;
  const isTrending = likes >= TRENDING_LIKES_THRESHOLD;

  const stageWidth = CARD_W + STACK_RESERVE_X * 2;
  const stageHeight = CARD_H + STACK_RESERVE_Y;

  return (
    <Link href={`/user-collections/${id}`} className="block">
      <article
        className="group cursor-pointer select-none"
        style={{ width: stageWidth }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative"
          style={{
            height: stageHeight,
            perspective: "1200px",
          }}
        >
          {/* Stack stage — centered, so back cards can fan to both sides */}
          <div
            className="absolute left-1/2 top-2"
            style={{
              width: CARD_W,
              transform: "translateX(-50%)",
              transformStyle: "preserve-3d",
            }}
          >
            {[...top3].reverse().map((movie, ri) => {
              const idx = top3.length - 1 - ri;
              const { x, y, rotate } = positions[idx];
              const isTop = idx === 0;

              return (
                <motion.div
                  key={movie.id}
                  className="absolute top-0 left-0"
                  style={{
                    width: CARD_W,
                    zIndex:
                      idx === 0 ? 30
                      : idx === 1 ? 20
                      : 10,
                    transformOrigin: "50% 90%",
                  }}
                  animate={{ x, y, rotate }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 22,
                    mass: 0.6,
                  }}
                >
                  <StackPoster
                    movie={movie}
                    isTop={isTop}
                    filmsCount={movies.length}
                    rating={rating}
                    hovered={hovered}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Soft ground shadow */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 bottom-1 -translate-x-1/2 rounded-full bg-black blur-2xl"
            style={{ zIndex: 1 }}
            animate={{
              width: hovered ? CARD_W * 1.1 : CARD_W * 0.78,
              height: hovered ? 24 : 16,
              opacity: hovered ? 0.55 : 0.45,
            }}
            transition={{ duration: 0.35 }}
          />

          {/* Accent glow under the top card on hover */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-accent blur-3xl pointer-events-none"
            style={{ top: "30%", width: CARD_W * 0.9, height: CARD_H * 0.4, zIndex: 0 }}
            animate={{ opacity: hovered ? 0.18 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Meta block */}
        <div className="mt-6 px-1">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "min-w-0 flex-1 truncate text-base font-semibold leading-tight transition-colors duration-300",
                hovered && "text-accent",
                !hovered && "text-foreground",
              )}
            >
              {label}
            </p>
            {isTrending && (
              <span className="flex items-center gap-1 rounded-full bg-accent/12 px-2 py-0.5 ring-1 ring-accent/25">
                <IconFlame className="size-3 text-accent" />
                <span className="text-xs font-semibold leading-none text-accent">hot</span>
              </span>
            )}
          </div>

          <p className="mt-1 truncate text-sm text-zinc-muted">{genres.join(" · ")}</p>

          <div className="mt-2.5 flex items-center gap-3.5">
            <span className="flex items-center gap-1 text-sm font-semibold text-gold">
              <IconStarFilled className="size-3.5 text-gold" />
              {rating.toFixed(1)}
            </span>

            <span className="flex items-center gap-1 text-sm text-zinc-muted">
              <IconEye className="size-3.5" />
              {views}
            </span>

            <span className="flex items-center gap-1 text-sm text-zinc-muted">
              <IconHeartFilled className="size-3.5" />
              {likes}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

const BEST_COLLECTIONS: CollectionCardData[] = [
  {
    id: 1,
    label: "Nightmares",
    genres: ["horror", "thriller"],
    rating: 7.1,
    views: "18.2K",
    likes: 934,
    movies: [mockMovies[0], mockMovies[2], mockMovies[7]],
  },
  {
    id: 2,
    label: "Age of adventure",
    genres: ["fantasy", "action"],
    rating: 8.0,
    views: "41.5K",
    likes: 2300,
    movies: [mockMovies[1], mockMovies[4], mockMovies[6]],
  },
  {
    id: 3,
    label: "Man and war",
    genres: ["drama", "mystery"],
    rating: 8.1,
    views: "27.8K",
    likes: 1540,
    movies: [mockMovies[3], mockMovies[5], mockMovies[7]],
  },
  {
    id: 4,
    label: "Great love",
    genres: ["melodrama", "drama"],
    rating: 7.9,
    views: "55.0K",
    likes: 4100,
    movies: [mockMovies[5], mockMovies[3], mockMovies[4]],
  },
  {
    id: 5,
    label: "Marvel and co.",
    genres: ["sci-fi", "action"],
    rating: 8.4,
    views: "98.3K",
    likes: 7200,
    movies: [mockMovies[6], mockMovies[0], mockMovies[1]],
  },
  {
    id: 6,
    label: "Dark stories",
    genres: ["thriller", "horror"],
    rating: 7.4,
    views: "14.1K",
    likes: 620,
    movies: [mockMovies[2], mockMovies[0], mockMovies[7]],
  },
  {
    id: 7,
    label: "Cult cinema",
    genres: ["adventure", "drama"],
    rating: 8.3,
    views: "36.7K",
    likes: 2890,
    movies: [mockMovies[1], mockMovies[5], mockMovies[3]],
  },
  {
    id: 8,
    label: "Best of the decade",
    genres: ["fantasy", "sci-fi"],
    rating: 8.5,
    views: "72.4K",
    likes: 5610,
    movies: [mockMovies[4], mockMovies[6], mockMovies[1]],
  },
];

const BestCollectionsSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative rounded-2xl overflow-hidden mb-14 border border-border">
      {/* Background layer */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/12 via-surface to-background" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-accent) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute -top-20 -left-20 size-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-10 size-64 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 px-8 pt-7 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-xl bg-accent/15 border border-accent/25">
              <BookOpen className="size-4 text-accent" />
            </div>

            <h2 className="text-xl font-bold text-foreground leading-tight">
              Best collections this month
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="rounded"
              size="icon"
              className="size-9"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="rounded"
              size="icon"
              className="size-9"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Swiper track */}
        <Swiper
          modules={[Navigation]}
          slidesPerView={5}
          spaceBetween={24}
          speed={500}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {BEST_COLLECTIONS.map((col) => (
            <SwiperSlide key={col.id}>
              <CollectionDeck {...col} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

type CatalogLayoutPreview = "grid" | "list";

const CatalogLayoutSwitch = () => {
  const [layout, setLayout] = useState<CatalogLayoutPreview>("grid");

  return (
    <div
      className="flex rounded-md border border-border bg-graphite p-0.5 shadow-inner"
      role="group"
      aria-label="Collection layout"
    >
      <Button
        type="button"
        variant="transparent"
        size="none"
        onClick={() => setLayout("grid")}
        className={cn(
          "relative flex h-8 w-10 items-center justify-center rounded-sm transition-[color,box-shadow,background-color]",
          layout === "grid" && "bg-surface text-accent shadow-sm ring-1 ring-border",
          layout !== "grid" && "text-zinc-muted hover:bg-surface/50 hover:text-primary",
        )}
        aria-pressed={layout === "grid"}
      >
        <LayoutGrid className="size-4" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="transparent"
        size="none"
        onClick={() => setLayout("list")}
        className={cn(
          "relative flex h-8 w-10 items-center justify-center rounded-sm transition-[color,box-shadow,background-color]",
          layout === "list" && "bg-surface text-accent shadow-sm ring-1 ring-border",
          layout !== "list" && "text-zinc-muted hover:bg-surface/50 hover:text-primary",
        )}
        aria-pressed={layout === "list"}
      >
        <LayoutList className="size-4" aria-hidden />
      </Button>
    </div>
  );
};

export default function Home() {
  return (
    <main className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <BestCollectionsSlider />

      <section className="flex items-center justify-between mb-8 bg-surface rounded-lg p-4 border border-border">
        <span className="text-base font-semibold text-primary">
          Collections: <span className="text-lg">121</span>
        </span>

        <div className="flex items-center gap-2">
          <FilterPopover />

          <CatalogLayoutSwitch />
        </div>
      </section>

      <div className="grid grid-cols-5 gap-x-4 gap-y-12 justify-items-center">
        {BEST_COLLECTIONS.map((col) => (
          <CollectionDeck key={col.id} {...col} />
        ))}
      </div>
    </main>
  );
}
