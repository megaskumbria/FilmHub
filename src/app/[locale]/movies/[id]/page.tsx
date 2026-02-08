"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { mockMovies } from "@/shared/model/movies";
import { Button } from "@/shared/ui";
import { Plus, Link2, Star, Calendar, Clock } from "lucide-react";

function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h} ч ${m} мин` : `${m} мин`;
}

export default function MoviePage() {
  const params = useParams();
  const id = params?.id != null ? Number(params.id) : NaN;
  const movie = Number.isInteger(id) ? mockMovies.find((m) => m.id === id) : undefined;

  if (!movie) notFound();

  const { imgUrl, title, genres, description, yearOfRelease, rating, durationMinutes } = movie;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen cover */}
      <div className="absolute inset-0">
        <Image src={imgUrl} alt={title} fill className="object-cover" priority sizes="100vw" />
        {/* Shadows around perimeter — gradient overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 120px 60px rgba(9,9,11,0.85), inset 0 0 240px 80px rgba(9,9,11,0.5)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none bg-linear-to-t from-background via-background/70 via-40% to-transparent"
          aria-hidden
        />
      </div>

      {/* CTA content — bottom-aligned */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen">
        <div className="max-w-[1640px] w-full mx-auto px-4 sm:px-6 pb-16 pt-32 sm:pb-20 sm:pt-36">
          <div className="max-w-2xl">
            {/* Meta row: rating, year, duration */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/20 border border-gold/40 backdrop-blur-sm">
                <Star className="size-4 text-gold fill-gold" />
                <span className="text-sm font-bold text-gold">{rating}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 border border-border/60 backdrop-blur-sm">
                <Calendar className="size-4 text-muted" />
                <span className="text-sm font-semibold text-foreground">{yearOfRelease}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 border border-border/60 backdrop-blur-sm">
                <Clock className="size-4 text-muted" />
                <span className="text-sm font-semibold text-foreground">
                  {formatDuration(durationMinutes)}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3 drop-shadow-lg">
              {title}
            </h1>

            {/* Genres */}
            <ul className="flex flex-wrap gap-2 mb-4">
              {genres.map((genre, idx) => (
                <li
                  key={idx}
                  className="rounded-md bg-accent/20 border border-accent/40 px-2.5 py-1 text-xs font-medium text-accent-foreground backdrop-blur-sm"
                >
                  {genre}
                </li>
              ))}
            </ul>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-xl drop-shadow-md">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="h-11 px-5 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 shadow-lg shadow-accent/25 border-0 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Plus className="size-5" />
                Добавить в коллекцию
              </Button>

              <Button
                variant="secondary"
                className="h-11 px-5 rounded-xl bg-secondary/90 backdrop-blur-sm border border-border text-foreground font-semibold hover:bg-secondary hover:border-accent/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link2 className="size-5" />
                Сгенерировать ссылку на просмотр
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
