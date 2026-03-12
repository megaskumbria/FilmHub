"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button, Input } from "@/shared/ui";
import { MovieCard } from "@/widgets/movie-card";
import { FilterPopover } from "@/widgets/movie-catalog-toolbar";
import { CollectionComments } from "@/widgets/collection-comments";
import { mockMovies } from "@/shared/model/movies";
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
  Settings,
  ImagePlus,
  Share2,
  Pencil,
  Search as SearchIcon,
  X,
} from "lucide-react";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";

interface Folder {
  id: number;
  name: string;
  icon: LucideIcon;
  count: number;
  posters: string[];
  accentColor: string;
  borderBase: string;
  borderActive: string;
  glowColor: string;
  iconColor: string;
}

const folders: Folder[] = [
  {
    id: 1,
    name: "Ужасы",
    icon: Ghost,
    count: 24,
    posters: ["/images/mock-movie-6.jpg", "/images/mock-movie-1.jpg", "/images/mock-movie-2.webp"],
    accentColor: "from-red-950/80 to-red-900/20",
    borderBase: "border-red-900/30",
    borderActive: "border-red-500/60",
    glowColor: "shadow-red-900/40",
    iconColor: "text-red-400",
  },
  {
    id: 2,
    name: "Любимое",
    icon: Heart,
    count: 47,
    posters: ["/images/mock-movie-4.jpg", "/images/mock-movie-5.webp", "/images/mock-movie-7.webp"],
    accentColor: "from-pink-950/80 to-pink-900/20",
    borderBase: "border-pink-900/30",
    borderActive: "border-pink-500/60",
    glowColor: "shadow-pink-900/40",
    iconColor: "text-pink-400",
  },
  {
    id: 3,
    name: "Детективы",
    icon: Search,
    count: 18,
    posters: [
      "/images/mock-movie-9.webp",
      "/images/mock-movie-3.webp",
      "/images/mock-movie-8.webp",
    ],
    accentColor: "from-amber-950/80 to-amber-900/20",
    borderBase: "border-amber-900/30",
    borderActive: "border-amber-500/60",
    glowColor: "shadow-amber-900/40",
    iconColor: "text-amber-400",
  },
  {
    id: 4,
    name: "Триллеры",
    icon: Zap,
    count: 31,
    posters: ["/images/mock-movie-2.webp", "/images/mock-movie-6.jpg", "/images/mock-movie-9.webp"],
    accentColor: "from-blue-950/80 to-blue-900/20",
    borderBase: "border-blue-900/30",
    borderActive: "border-blue-500/60",
    glowColor: "shadow-blue-900/40",
    iconColor: "text-blue-400",
  },
];

const stats = [
  { label: "Коллекций", value: "17", Icon: BookOpen },
  { label: "Фильмов", value: "248", Icon: Film },
  { label: "Подписчиков", value: "1.2K", Icon: Users },
  { label: "Рейтинг", value: "4.8", Icon: Star },
] satisfies { label: string; value: string; Icon: LucideIcon }[];

export default function AuthorDashboardPage() {
  const [activeFolder, setActiveFolder] = useState(0);
  const [hoveredFolder, setHoveredFolder] = useState<number | null>(null);
  const [isCollectionVisible, setIsCollectionVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { layout, blockOptions } = useMovieCardLayout();

  const currentFolder = folders[activeFolder];

  const ToggleIcon = isCollectionVisible ? EyeOff : Eye;

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

              const isHovered = hoveredFolder === index;

              const fanOut = [
                { x: -26, rot: -8, scale: 0.88 },
                { x: 0, rot: 0, scale: 0.96 },
                { x: 26, rot: 8, scale: 0.88 },
              ];
              const stacked = [
                { x: 0, rot: 0, scale: 0.92 },
                { x: 0, rot: 0, scale: 0.92 },
                { x: 0, rot: 0, scale: 0.92 },
              ];
              const posterTransforms = isHovered || isActive ? fanOut : stacked;

              return (
                <div
                  key={folder.id}
                  className="relative pt-3"
                  onMouseEnter={() => setHoveredFolder(index)}
                  onMouseLeave={() => setHoveredFolder(null)}
                >
                  {/* Folder tab (tongue) */}
                  <div
                    className={cn(
                      "absolute top-0 left-4 h-3 w-16 rounded-t-md border-t border-l border-r transition-colors duration-300",
                      isActive ? folder.borderActive : folder.borderBase,
                      "bg-surface",
                    )}
                  />

                  <Button
                    onClick={() => setActiveFolder(index)}
                    className={cn(
                      "relative flex-col items-stretch gap-0 h-auto p-0 rounded-b-xl rounded-tr-xl border overflow-hidden transition-all duration-300 cursor-pointer w-full",
                      isActive ? folder.borderActive : folder.borderBase,
                      isActive && "shadow-lg",
                      isActive && folder.glowColor,
                    )}
                  >
                    {/* Poster shelf */}
                    <div className="relative h-36 bg-surface overflow-hidden">
                      {folder.posters.map((src, i) => {
                        const t = posterTransforms[i];

                        return (
                          <div
                            key={i}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ zIndex: i === 1 ? 20 : 10 }}
                          >
                            <div
                              className="relative w-20 h-28 rounded-md overflow-hidden shadow-xl ring-1 ring-white/10 transition-all duration-350 ease-out"
                              style={{
                                transform: `translateX(${t.x}px) rotate(${t.rot}deg) scale(${t.scale})`,
                              }}
                            >
                              <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                            </div>
                          </div>
                        );
                      })}

                      {/* Color gradient overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 bg-linear-to-t opacity-60",
                          folder.accentColor,
                        )}
                      />

                      {/* Icon badge top-left */}
                      <div
                        className={cn(
                          "absolute top-2.5 left-2.5 size-7 rounded-lg bg-black/40 flex items-center justify-center ring-1 ring-white/10 z-30",
                          folder.iconColor,
                        )}
                      >
                        <Icon className="size-3.5" />
                      </div>

                      {/* Active indicator dot */}
                      <div
                        className={cn(
                          "absolute top-2.5 right-2.5 size-1.5 rounded-full z-30 transition-opacity duration-200",
                          isActive ? "opacity-100" : "opacity-0",
                          isActive && "bg-white",
                        )}
                      />
                    </div>

                    {/* Footer */}
                    <div className="px-3.5 py-2.5 bg-surface flex items-center justify-between border-t border-border/50">
                      <span className="font-semibold text-foreground text-sm">{folder.name}</span>

                      {/* Count (default) / Eye + Settings (hover) */}
                      <div className="relative flex items-center shrink-0">
                        <span
                          className={cn(
                            "text-sm text-zinc-muted tabular-nums transition-opacity duration-200",
                            isHovered ? "opacity-0" : "opacity-100",
                          )}
                        >
                          {folder.count}
                        </span>

                        <div
                          className={cn(
                            "absolute right-0 flex items-center gap-1 transition-opacity duration-200",
                            isHovered ? "opacity-100" : "opacity-0",
                          )}
                        >
                          <Button
                            onClick={(e) => e.stopPropagation()}
                            className="size-6 rounded-md flex items-center justify-center text-zinc-muted hover:text-foreground hover:bg-white/10 transition-colors"
                          >
                            <Settings className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Active Collection ─────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            {/* Left: title + badge */}
            <div className="flex items-center gap-3">
              {currentFolder && (
                <div className={cn("shrink-0", currentFolder.iconColor)}>
                  <currentFolder.icon className="size-5" />
                </div>
              )}
              <h2 className={cn("text-lg font-bold", currentFolder?.iconColor)}>
                {currentFolder?.name}
              </h2>
              <div className="w-px h-4 bg-border shrink-0" />
              <span className="text-base font-normal text-foreground">{currentFolder?.count}</span>
            </div>

            {/* Right: search + filters + actions */}
            <div className="flex items-center gap-2">
              {/* Expandable search */}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out",
                    isSearchOpen ? "w-52" : "w-0",
                  )}
                >
                  <Input
                    value={searchQuery}
                    variant="neutral"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск по коллекции..."
                    className="h-9 text-sm rounded-lg border-border bg-surface placeholder:text-zinc-muted"
                    autoFocus={isSearchOpen}
                  />
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen((v) => !v);
                    if (isSearchOpen) setSearchQuery("");
                  }}
                  className={cn(
                    "rounded-lg size-9 p-0 border transition-colors duration-200",
                    isSearchOpen ?
                      "bg-accent/10 border-accent/30 text-accent"
                    : "bg-transparent border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted",
                  )}
                >
                  {isSearchOpen ?
                    <X className="size-4" />
                  : <SearchIcon className="size-4" />}
                </Button>
              </div>

              <FilterPopover />

              {/* Divider */}
              <div className="w-px h-5 bg-border shrink-0" />

              <Button
                size="sm"
                className="transition-colors duration-200 h-9 shrink-0 whitespace-nowrap rounded-lg gap-2 bg-transparent border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
              >
                <Clapperboard className="size-4 shrink-0" />
                <span className="text-sm">Добавить фильм вручную</span>
              </Button>

              <Button
                size="sm"
                onClick={() => setIsCollectionVisible((v) => !v)}
                className={cn(
                  "rounded-lg size-9 p-0 border transition-colors duration-200",
                  isCollectionVisible ?
                    "bg-transparent border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
                  : "bg-success/10 border-success/30 text-success",
                )}
              >
                <ToggleIcon className="size-4" />
              </Button>

              {/* Divider */}
              <div className="w-px h-5 bg-border shrink-0" />

              <CollectionComments />
            </div>
          </div>

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
