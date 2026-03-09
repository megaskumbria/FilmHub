"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { MovieCard } from "@/widgets/movie-card";
import { mockMovies } from "@/shared/model/movies";
import { defaultLayout } from "@/shared/model/stores/movie-card-layout";
import { cn } from "@/shared/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Plus,
  Clapperboard,
  Eye,
  EyeOff,
  Ghost,
  Heart,
  Search,
  Zap,
  BookOpen,
  Film,
  Users,
  Star,
} from "lucide-react";

interface Folder {
  id: number;
  name: string;
  icon: LucideIcon;
  count: number;
  bgFrom: string;
  bgTo: string;
  iconBg: string;
  iconColor: string;
  borderBase: string;
  borderActive: string;
  dot: string;
}

const folders: Folder[] = [
  {
    id: 1,
    name: "Ужасы",
    icon: Ghost,
    count: 24,
    bgFrom: "from-red-950/50",
    bgTo: "to-background",
    iconBg: "bg-red-950/60",
    iconColor: "text-red-400",
    borderBase: "border-red-900/30",
    borderActive: "border-red-500/50",
    dot: "bg-red-500",
  },
  {
    id: 2,
    name: "Любимое",
    icon: Heart,
    count: 47,
    bgFrom: "from-pink-950/50",
    bgTo: "to-background",
    iconBg: "bg-pink-950/60",
    iconColor: "text-pink-400",
    borderBase: "border-pink-900/30",
    borderActive: "border-pink-500/50",
    dot: "bg-pink-500",
  },
  {
    id: 3,
    name: "Детективы",
    icon: Search,
    count: 18,
    bgFrom: "from-amber-950/50",
    bgTo: "to-background",
    iconBg: "bg-amber-950/60",
    iconColor: "text-amber-400",
    borderBase: "border-amber-900/30",
    borderActive: "border-amber-500/50",
    dot: "bg-amber-500",
  },
  {
    id: 4,
    name: "Триллеры",
    icon: Zap,
    count: 31,
    bgFrom: "from-blue-950/50",
    bgTo: "to-background",
    iconBg: "bg-blue-950/60",
    iconColor: "text-blue-400",
    borderBase: "border-blue-900/30",
    borderActive: "border-blue-500/50",
    dot: "bg-blue-500",
  },
];

const cardBlockOptions = {
  poster: { flags: { showFlags: false } },
  hover: { flags: { showFlags: false } },
  body: { flags: { showFlags: false } },
};

const stats = [
  { label: "Коллекций", value: "17", Icon: BookOpen },
  { label: "Фильмов", value: "248", Icon: Film },
  { label: "Подписчиков", value: "1.2K", Icon: Users },
  { label: "Рейтинг", value: "4.8", Icon: Star },
] satisfies { label: string; value: string; Icon: LucideIcon }[];

export default function AuthorDashboardPage() {
  const [activeFolder, setActiveFolder] = useState(0);
  const [isCollectionVisible, setIsCollectionVisible] = useState(true);

  const currentFolder = folders[activeFolder];

  const ToggleIcon = isCollectionVisible ? EyeOff : Eye;
  const toggleLabel = isCollectionVisible ? "Спрятать" : "Показать";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16 space-y-8">
        {/* ── Author Profile Header ─────────────────────────────────── */}
        <header className="relative rounded-2xl overflow-hidden border border-border bg-surface p-8">
          <div className="absolute inset-0 bg-linear-to-r from-accent/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 size-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex items-center gap-6">
            <div className="relative shrink-0">
              <div className="size-20 rounded-2xl bg-linear-to-br from-accent to-accent/60 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-accent/20 select-none">
                P
              </div>
              <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-accent rounded-full border-2 border-surface" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-foreground truncate">Pavel Ivanov</h1>
                <span className="shrink-0 text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-medium border border-accent/25">
                  Автор
                </span>
              </div>
              <p className="text-zinc-muted text-sm mb-5">
                @pavel_films · Кино-энтузиаст с 2019 года
              </p>

              <div className="flex items-center gap-8">
                {stats.map(({ label, value, Icon }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="size-4 text-zinc-muted shrink-0" />
                    <span className="text-foreground font-semibold text-sm">{value}</span>
                    <span className="text-zinc-muted text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ── Collections Row ──────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Мои коллекции</h2>
            <Button variant="accent" size="sm" className="rounded-lg gap-2">
              <Plus className="size-4" />
              <span className="text-sm font-medium">Создать</span>
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {folders.map((folder, index) => {
              const Icon = folder.icon;
              const isActive = activeFolder === index;

              return (
                <Button
                  key={folder.id}
                  onClick={() => setActiveFolder(index)}
                  className={cn(
                    "group relative flex-col items-start gap-0 h-auto p-5 rounded-xl border transition-all duration-200 cursor-pointer bg-linear-to-br",
                    folder.bgFrom,
                    folder.bgTo,
                    folder.borderBase,
                    isActive && "ring-1 ring-accent/40",
                    isActive && folder.borderActive,
                  )}
                >
                  <div
                    className={cn(
                      "size-10 rounded-lg flex items-center justify-center mb-4",
                      folder.iconBg,
                      folder.iconColor,
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <span className="font-semibold text-foreground text-sm mb-0.5 block">
                    {folder.name}
                  </span>
                  <span className="text-xs text-zinc-muted block">{folder.count} фильмов</span>

                  <div
                    className={cn(
                      "absolute top-3 right-3 size-1.5 rounded-full transition-opacity duration-200",
                      folder.dot,
                      isActive && "opacity-100",
                      !isActive && "opacity-0",
                    )}
                  />
                </Button>
              );
            })}
          </div>
        </section>

        {/* ── Active Collection ─────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-foreground">{currentFolder?.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface border border-border text-zinc-muted">
                {currentFolder?.count} фильмов
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-lg gap-2 border border-border"
              >
                <Clapperboard className="size-4" />
                <span className="text-sm">Добавить фильм вручную</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsCollectionVisible((v) => !v)}
                className="rounded-lg gap-2 border border-border"
              >
                <ToggleIcon className="size-4" />
                <span className="text-sm">{toggleLabel}</span>
              </Button>
            </div>
          </div>

          <ul className="grid grid-cols-5 gap-4">
            {mockMovies.map((movie) => (
              <li key={movie.id}>
                <Link href={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} layout={defaultLayout} blockOptions={cardBlockOptions} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
