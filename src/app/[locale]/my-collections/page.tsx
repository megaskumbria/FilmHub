"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { MovieCard, CollectionsToolbar, UserCollections } from "@/widgets";
import { mockMovies } from "@/shared/model/movies";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Film, Users, Star, ImagePlus, Share2, Pencil } from "lucide-react";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";

const stats = [
  { label: "Коллекций", value: "17", Icon: BookOpen },
  { label: "Фильмов", value: "248", Icon: Film },
  { label: "Подписчиков", value: "1.2K", Icon: Users },
  { label: "Рейтинг", value: "4.8", Icon: Star },
] satisfies { label: string; value: string; Icon: LucideIcon }[];

export default function AuthorDashboardPage() {
  const [activeFolder, setActiveFolder] = useState(0);

  const { layout, blockOptions } = useMovieCardLayout();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16 space-y-8">
        {/* ── Author Profile Header ─────────────────────────────────── */}
        <header className="relative rounded-2xl overflow-hidden border border-border">
          {/* Cover photo */}
          <div className="group relative h-56 w-full">
            <Image
              src="/images/mock-slider-5.jpg"
              alt="Cover"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            {/* Dark gradient overlay so text stays readable */}
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />

            {/* Change cover button — top-right, visible on hover */}
            <div className="absolute top-3 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-lg gap-2 bg-black/50 border-white/15 text-white hover:bg-black/70"
              >
                <ImagePlus className="size-4" />
                <span className="text-sm">Изменить обложку</span>
              </Button>
            </div>
          </div>

          {/* Profile row — sits below the cover, overlaps it via negative margin */}
          <div className="relative bg-surface px-8 pb-6">
            <div className="flex items-end gap-5 -mt-10">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="size-20 rounded-2xl bg-linear-to-br from-accent to-accent/60 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-accent/30 ring-4 ring-surface select-none">
                  P
                </div>
                <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-accent rounded-full border-2 border-surface" />
              </div>

              {/* Name + handle */}
              <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-center gap-3 mb-0.5">
                  <h1 className="text-2xl font-bold text-foreground truncate">Pavel Ivanov</h1>
                  <span className="shrink-0 text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-medium border border-accent/25">
                    Автор
                  </span>
                </div>
                <p className="text-zinc-muted text-sm">@pavel_films · Кино-энтузиаст с 2019 года</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between gap-3 mt-5">
              <div className="flex items-center gap-2.5">
                {stats.map(({ label, value, Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background border border-border"
                  >
                    <Icon className="size-4 text-zinc-muted shrink-0" />
                    <span className="text-foreground font-bold text-base">{value}</span>
                    <span className="text-zinc-muted text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Profile action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  className="rounded-lg size-9 p-0 bg-transparent border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
                >
                  <Share2 className="size-4" />
                </Button>
                <Button variant="accent" size="sm" className="rounded-lg gap-2">
                  <Pencil className="size-3.5" />
                  <span className="text-sm">Редактировать</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* ── Collections Row ──────────────────────────────────────── */}
        <section>
          <UserCollections setActiveFolder={setActiveFolder} activeFolder={activeFolder} />
        </section>

        {/* ── Active Collection ─────────────────────────────────────── */}
        <section>
          <CollectionsToolbar activeFolder={activeFolder} />

          <ul className="grid grid-cols-5 gap-4">
            {mockMovies.map((movie) => (
              <li key={movie.id}>
                <Link href={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} layout={layout} blockOptions={blockOptions} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
