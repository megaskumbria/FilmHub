"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Eye,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
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

interface DeckMeta {
  label: string;
  genres: string[];
  rating: number;
  views: string;
  likes: number;
}

interface DeckProps {
  movies: IMovieCardData[];
  meta: DeckMeta;
  id: number;
}

const STACK_OFFSETS = [
  { x: 0, y: 0, rotate: 0 },
  { x: 12, y: 6, rotate: 3 },
  { x: 22, y: 12, rotate: 6 },
];

const STACK_OFFSETS_HOVERED = [
  { x: 0, y: -16, rotate: 0 },
  { x: 16, y: 4, rotate: 5 },
  { x: 28, y: 14, rotate: 9 },
];

const TopCard = ({ movie }: { movie: IMovieCardData }) => (
  <div
    className="w-full rounded-xl overflow-hidden border border-border shadow-xl relative"
    style={{ height: CARD_H }}
  >
    <Image
      src={movie.imgUrl}
      alt={movie.title}
      width={CARD_W}
      height={CARD_H}
      className="w-full h-full object-cover"
    />
  </div>
);

const BehindCard = ({ movie }: { movie: IMovieCardData }) => (
  <div
    className="w-full rounded-2xl overflow-hidden border border-accent/20 shadow-md"
    style={{ height: CARD_H }}
  >
    <Image
      src={movie.imgUrl}
      alt={movie.title}
      width={CARD_W}
      height={CARD_H}
      className="w-full h-full object-cover brightness-40"
    />
  </div>
);

const Deck = ({ movies, meta, id }: DeckProps) => {
  const [hovered, setHovered] = useState(false);

  const top3 = movies.slice(0, 3);
  const offsets = hovered ? STACK_OFFSETS_HOVERED : STACK_OFFSETS;

  return (
    <Link href={`/user-collections/${id}`}>
      <article
        className="cursor-pointer select-none group"
        style={{ width: CARD_W + STACK_OFFSETS[2].x }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative" style={{ height: CARD_H + STACK_OFFSETS[2].y + 16 }}>
          {[...top3].reverse().map((movie, ri) => {
            const idx = top3.length - 1 - ri;
            const { x, y, rotate } = offsets[idx];
            const isTop = idx === 0;

            return (
              <div
                key={movie.id}
                className="absolute top-0 left-0"
                style={{
                  width: CARD_W,
                  transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
                  transition: "transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex:
                    idx === 0 ? 30
                    : idx === 1 ? 20
                    : 10,
                  transformOrigin: "bottom center",
                }}
              >
                {isTop ?
                  <TopCard movie={movie} />
                : <BehindCard movie={movie} />}
              </div>
            );
          })}

          <div
            className="absolute inset-x-0 -bottom-2 mx-auto h-5 w-3/4 rounded-full blur-xl bg-black/50"
            style={{ zIndex: 5 }}
          />
        </div>

        <div className="mt-4 pl-0.5">
          <div className="flex items-baseline justify-between gap-2">
            <p
              className={cn(
                "text-base font-semibold leading-tight truncate transition-colors duration-200",
                hovered ? "text-accent" : "text-foreground",
              )}
            >
              {meta.label}
            </p>
            <span className="shrink-0 text-sm text-zinc-muted">{movies.length} movies</span>
          </div>

          <p className="mt-0.5 text-sm text-zinc-muted truncate">{meta.genres.join(" · ")}</p>

          <div className="mt-2 flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm font-semibold text-gold">
              <Star className="size-3.5 fill-gold text-gold" />
              {meta.rating.toFixed(1)}
            </span>

            <span className="flex items-center gap-1 text-sm text-zinc-muted">
              <Eye className="size-3.5" />
              {meta.views}
            </span>

            <span className="flex items-center gap-1 text-sm text-zinc-muted">
              <Heart className="size-3.5" />
              {meta.likes}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

interface CollectionCardData {
  id: number;
  label: string;
  genres: string[];
  rating: number;
  views: string;
  likes: number;
  movies: IMovieCardData[];
}

const COLLECTION_STACK_OFFSETS = [
  { x: 0, y: 0, rotate: 0 },
  { x: 12, y: 6, rotate: 3 },
  { x: 22, y: 12, rotate: 6 },
];

const COLLECTION_STACK_OFFSETS_HOVERED = [
  { x: 0, y: -16, rotate: 0 },
  { x: 16, y: 4, rotate: 5 },
  { x: 28, y: 14, rotate: 9 },
];

const COLL_CARD_W = 220;
const COLL_CARD_H = Math.round(COLL_CARD_W * (3 / 2));

const CollectionMiniCard = ({ movie, dim }: { movie: IMovieCardData; dim?: boolean }) => (
  <div
    className={cn(
      "w-full rounded-xl overflow-hidden border shadow-lg",
      dim ? "border-accent/15" : "border-border",
    )}
    style={{ height: COLL_CARD_H }}
  >
    <Image
      src={movie.imgUrl}
      alt={movie.title}
      width={COLL_CARD_W}
      height={COLL_CARD_H}
      className={cn("w-full h-full object-cover", dim && "brightness-40")}
    />
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
  const offsets = hovered ? COLLECTION_STACK_OFFSETS_HOVERED : COLLECTION_STACK_OFFSETS;

  return (
    <Link href={`/user-collections/${id}`}>
      <article
        className="cursor-pointer select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative"
          style={{ height: COLL_CARD_H + COLLECTION_STACK_OFFSETS[2].y + 16 }}
        >
          {[...top3].reverse().map((movie, ri) => {
            const idx = top3.length - 1 - ri;
            const { x, y, rotate } = offsets[idx];
            const isTop = idx === 0;

            return (
              <div
                key={movie.id}
                className="absolute top-0 left-0"
                style={{
                  width: COLL_CARD_W,
                  transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
                  transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex:
                    idx === 0 ? 30
                    : idx === 1 ? 20
                    : 10,
                  transformOrigin: "bottom center",
                }}
              >
                <CollectionMiniCard movie={movie} dim={!isTop} />
              </div>
            );
          })}
        </div>

        <div className="mt-3 pl-0.5">
          <p
            className={cn(
              "text-sm font-semibold leading-tight truncate transition-colors duration-200",
              hovered ? "text-accent" : "text-foreground",
            )}
          >
            {label}
          </p>
          <p className="mt-0.5 text-sm text-zinc-muted truncate">{genres.join(" · ")}</p>
          <div className="mt-1.5 flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-sm font-semibold text-gold">
              <Star className="size-3 fill-gold text-gold" />
              {rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1 text-sm text-zinc-muted">
              <Eye className="size-3" />
              {views}
            </span>
            <span className="flex items-center gap-1 text-sm text-zinc-muted">
              <Heart className="size-3" />
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
          spaceBetween={8}
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

const DECKS: DeckProps[] = [
  {
    id: 1,
    movies: [mockMovies[0], mockMovies[2], mockMovies[7]],
    meta: {
      label: "Nightmares",
      genres: ["horror", "thriller"],
      rating: 7.1,
      views: "18.2K",
      likes: 934,
    },
  },
  {
    id: 2,
    movies: [mockMovies[1], mockMovies[4], mockMovies[6]],
    meta: {
      label: "Age of adventure",
      genres: ["fantasy", "action"],
      rating: 8.0,
      views: "41.5K",
      likes: 2300,
    },
  },
  {
    id: 3,
    movies: [mockMovies[3], mockMovies[5], mockMovies[7]],
    meta: {
      label: "Man and war",
      genres: ["drama", "mystery"],
      rating: 8.1,
      views: "27.8K",
      likes: 1540,
    },
  },
  {
    id: 4,
    movies: [mockMovies[5], mockMovies[3], mockMovies[4]],
    meta: {
      label: "Great love",
      genres: ["melodrama", "drama"],
      rating: 7.9,
      views: "55.0K",
      likes: 4100,
    },
  },
  {
    id: 5,
    movies: [mockMovies[6], mockMovies[0], mockMovies[1]],
    meta: {
      label: "Marvel and co.",
      genres: ["sci-fi", "action"],
      rating: 8.4,
      views: "98.3K",
      likes: 7200,
    },
  },
  {
    id: 6,
    movies: [mockMovies[2], mockMovies[0], mockMovies[7]],
    meta: {
      label: "Dark stories",
      genres: ["thriller", "horror"],
      rating: 7.4,
      views: "14.1K",
      likes: 620,
    },
  },
  {
    id: 7,
    movies: [mockMovies[1], mockMovies[5], mockMovies[3]],
    meta: {
      label: "Cult cinema",
      genres: ["adventure", "drama"],
      rating: 8.3,
      views: "36.7K",
      likes: 2890,
    },
  },
  {
    id: 8,
    movies: [mockMovies[4], mockMovies[6], mockMovies[1]],
    meta: {
      label: "Best of the decade",
      genres: ["fantasy", "sci-fi"],
      rating: 8.5,
      views: "72.4K",
      likes: 5610,
    },
  },
];

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

      <div className="grid grid-cols-5 gap-x-1 gap-y-10">
        {DECKS.map((deck, i) => (
          <Deck key={i} {...deck} id={i} />
        ))}
      </div>
    </main>
  );
}
