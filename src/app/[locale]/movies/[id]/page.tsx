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
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background poster with overlay */}
      <div className="absolute inset-0">
        <Image src={imgUrl} alt={title} fill className="object-cover" priority />
        {/* Inset shadow vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />
        {/* Bottom to top gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content area */}
      <div className="relative h-full flex items-end">
        <div className="w-full max-w-2xl p-8 pb-16 space-y-6">
          {/* Metadata badges */}
          <div className="flex flex-wrap gap-3">
            {/* Rating badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/50 shadow-lg shadow-amber-500/20">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-amber-100 font-semibold">{rating}</span>
            </div>

            {/* Year badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Calendar className="w-4 h-4 text-white/80" />
              <span className="text-white/90 font-medium">{yearOfRelease}</span>
            </div>

            {/* Duration badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-white/90 font-medium">{formatDuration(durationMinutes)}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {title}
          </h1>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 text-sm font-medium rounded-full bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 text-blue-100 shadow-lg"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/70 text-lg leading-relaxed line-clamp-3 drop-shadow-md">
            {description}
          </p>

          {/* Action buttons */}
          <div className="flex gap-4 pt-2">
            <Button className="flex items-center gap-2 px-6 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xl shadow-blue-600/40 backdrop-blur-md border border-blue-500/50 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/60">
              <Plus className="w-5 h-5" />
              Добавить в коллекцию
            </Button>

            <Button className="flex items-center gap-2 px-6 py-3 text-base font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg shadow-lg backdrop-blur-md border border-white/30 transition-all duration-200 hover:scale-105 hover:border-white/50">
              <Link2 className="w-5 h-5" />
              Сгенерировать ссылку
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
