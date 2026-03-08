"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { mockMovies } from "@/shared/model/movies";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import { Plus, Link2, Clock, CalendarDays, Info } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ActorsCarousel, PosterCarousel } from "@/widgets";

function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}ч ${m}мин` : `${m}мин`;
}

export default function MoviePage() {
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  const params = useParams();
  const id = params?.id != null ? Number(params.id) : NaN;
  const movie = Number.isInteger(id) ? mockMovies.find((m) => m.id === id) : undefined;

  if (!movie) notFound();

  const { imgUrl, title, genres, description, yearOfRelease, durationMinutes, posters } = movie;

  const realPoster = selectedPoster ?? imgUrl;

  return (
    <div className="relative w-full overflow-hidden h-screen">
      <div className="absolute inset-0 w-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={realPoster}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Image src={realPoster} alt={title} fill className="object-cover" priority />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient scrims — ensures readability on any image */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end">
        <div className="flex items-end justify-between gap-10 px-14 mb-10">
          {/* ── Left: movie info ── */}
          <div className="max-w-xl shrink-0 flex flex-col gap-4">
            {/* Metadata chips */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-medium">
                <CalendarDays className="size-3" />
                {yearOfRelease}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-medium">
                <Clock className="size-3" />
                {formatDuration(durationMinutes)}
              </span>
            </div>

            {/* Genre chips */}
            <div className="flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-6xl font-black text-white leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
              {title}
            </h1>

            {/* Description */}
            <p className="text-white/70 font-medium text-sm leading-relaxed line-clamp-4 max-w-md">
              {description}
            </p>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                variant="accent"
                size="lg"
                className="gap-2 rounded-lg font-semibold shadow-lg shadow-accent/30"
              >
                <Plus className="size-4" />
                <span>Добавить в коллекцию</span>
              </Button>

              <Button
                size="lg"
                className="gap-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold border border-white/20 text-white"
              >
                <Link2 className="size-4" />
                <span>Сгенерировать ссылку</span>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="size-4 text-white/60" />
                  </TooltipTrigger>

                  <TooltipContent>
                    <p className="text-sm">
                      Генерирует ссылку на бесплатный источник для просмотра фильма.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Button>
            </div>

            {/* Actors */}
            <ActorsCarousel />
          </div>

          {/* ── Right: Posters ── */}
          {posters && posters.length > 0 && (
            <div className="shrink-0">
              <PosterCarousel
                posters={posters}
                imgUrl={imgUrl}
                selectedPoster={selectedPoster}
                setSelectedPoster={setSelectedPoster}
                title={title}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
