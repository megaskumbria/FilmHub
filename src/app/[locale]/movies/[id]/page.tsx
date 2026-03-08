"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { mockMovies } from "@/shared/model/movies";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import { Plus, Link2, Clock, CalendarDays, Info } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PosterCarousel } from "@/widgets";

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

      {/* Content pinned to the bottom */}
      <div className="relative h-full flex flex-col justify-end">
        <div className="flex items-end justify-between gap-10 px-14 mb-32">
          {/* ── Left: movie info ── */}
          <div className="max-w-lg shrink-0">
            {/* Metadata row */}
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 text-sm">
              <div className="flex items-center gap-1.5 text-white/70">
                <CalendarDays className="size-3.5" />
                <span>{yearOfRelease}</span>
              </div>

              <span className="text-zinc-muted">·</span>

              <div className="flex items-center gap-1.5 text-white/70">
                <Clock className="size-3.5" />
                <span>{formatDuration(durationMinutes)}</span>
              </div>

              <span className="text-zinc-muted">·</span>
              <span className="text-white/60">{genres.join(", ")}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-white leading-tight">{title}</h1>

            {/* Description */}
            <p className="text-muted font-medium text-base leading-snug line-clamp-5 max-w-md">
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
                className="gap-2 bg-secondary hover:bg-secondary/90 rounded-lg font-semibold border border-border/60"
              >
                <Link2 className="size-4" />
                <span>Сгенерировать ссылку</span>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="size-4" />
                  </TooltipTrigger>

                  <TooltipContent>
                    <p className="text-sm">
                      Генерирует ссылку на бесплатный источник для просмотра фильма.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Button>
            </div>
          </div>

          {/* ── Right: Posters ── */}
          {posters && posters.length > 0 && (
            <PosterCarousel
              posters={posters}
              imgUrl={imgUrl}
              selectedPoster={selectedPoster}
              setSelectedPoster={setSelectedPoster}
              title={title}
            />
          )}
        </div>
      </div>
    </div>
  );
}
