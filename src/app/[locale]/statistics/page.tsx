"use client";

import { useState } from "react";
import {
  MapPin,
  Film,
  BarChart2,
  CalendarDays,
  Clock,
  Sparkles,
  ArrowRight,
  Lock,
  TrendingUp,
  Clapperboard,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

// ---------------------------------------------------------------------------
// Mock data — in production this comes from the API
// ---------------------------------------------------------------------------

interface UserMovie {
  id: number;
  title: string;
  genres: string[];
  yearOfRelease: number;
  rating: number;
  addedAt: string; // ISO date
}

const userMovies: UserMovie[] = [
  {
    id: 1,
    title: "The Last House on the Left",
    genres: ["horror", "thriller"],
    yearOfRelease: 2009,
    rating: 6.5,
    addedAt: "2022-02-10",
  },
  {
    id: 2,
    title: "A Minecraft Movie",
    genres: ["fantasy", "adventure"],
    yearOfRelease: 2025,
    rating: 7.0,
    addedAt: "2022-03-05",
  },
  {
    id: 3,
    title: "Insidious",
    genres: ["horror", "thriller"],
    yearOfRelease: 2010,
    rating: 6.8,
    addedAt: "2022-04-18",
  },
  {
    id: 4,
    title: "Incendies",
    genres: ["drama", "mystery", "war"],
    yearOfRelease: 2010,
    rating: 8.1,
    addedAt: "2022-06-22",
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Two Towers",
    genres: ["fantasy", "adventure"],
    yearOfRelease: 2002,
    rating: 8.7,
    addedAt: "2022-08-01",
  },
  {
    id: 6,
    title: "Titanic",
    genres: ["melodrama", "drama"],
    yearOfRelease: 1997,
    rating: 7.8,
    addedAt: "2022-09-14",
  },
  {
    id: 7,
    title: "Avengers: Endgame",
    genres: ["sci-fi", "adventure", "action"],
    yearOfRelease: 2019,
    rating: 8.4,
    addedAt: "2022-11-03",
  },
  {
    id: 8,
    title: "The Platform",
    genres: ["sci-fi", "thriller", "horror"],
    yearOfRelease: 2019,
    rating: 7.9,
    addedAt: "2023-01-20",
  },
  {
    id: 9,
    title: "Requiem for a Dream",
    genres: ["drama"],
    yearOfRelease: 2000,
    rating: 8.3,
    addedAt: "2023-03-08",
  },
  {
    id: 10,
    title: "Mr. Nobody",
    genres: ["drama", "sci-fi"],
    yearOfRelease: 2009,
    rating: 7.9,
    addedAt: "2023-04-25",
  },
  {
    id: 11,
    title: "Elena",
    genres: ["drama"],
    yearOfRelease: 2011,
    rating: 7.7,
    addedAt: "2023-06-12",
  },
  {
    id: 12,
    title: "Dogville",
    genres: ["drama", "crime"],
    yearOfRelease: 2003,
    rating: 8.0,
    addedAt: "2023-08-03",
  },
  {
    id: 13,
    title: "Leviathan",
    genres: ["drama"],
    yearOfRelease: 2014,
    rating: 7.7,
    addedAt: "2023-09-19",
  },
  {
    id: 14,
    title: "La La Land",
    genres: ["melodrama", "musical"],
    yearOfRelease: 2016,
    rating: 8.0,
    addedAt: "2023-11-07",
  },
  {
    id: 15,
    title: "Loveless",
    genres: ["drama"],
    yearOfRelease: 2017,
    rating: 7.9,
    addedAt: "2024-01-14",
  },
  {
    id: 16,
    title: "Stalker",
    genres: ["drama", "sci-fi"],
    yearOfRelease: 1979,
    rating: 8.1,
    addedAt: "2024-02-28",
  },
  {
    id: 17,
    title: "Blow-Up",
    genres: ["mystery", "drama"],
    yearOfRelease: 1966,
    rating: 7.7,
    addedAt: "2024-04-05",
  },
  {
    id: 18,
    title: "Melancholia",
    genres: ["drama", "sci-fi"],
    yearOfRelease: 2011,
    rating: 7.8,
    addedAt: "2024-05-22",
  },
  {
    id: 19,
    title: "Mirror",
    genres: ["drama"],
    yearOfRelease: 1975,
    rating: 8.1,
    addedAt: "2024-07-09",
  },
  {
    id: 20,
    title: "Parasite",
    genres: ["crime", "drama", "thriller"],
    yearOfRelease: 2019,
    rating: 8.5,
    addedAt: "2024-08-18",
  },
  {
    id: 21,
    title: "Uncle Boonmee Who Can Recall His Past Lives",
    genres: ["drama", "sci-fi"],
    yearOfRelease: 2010,
    rating: 6.9,
    addedAt: "2024-09-30",
  },
  {
    id: 22,
    title: "Happy Hour",
    genres: ["drama"],
    yearOfRelease: 2015,
    rating: 7.6,
    addedAt: "2024-11-12",
  },
  {
    id: 23,
    title: "Portrait of a Lady on Fire",
    genres: ["melodrama", "drama"],
    yearOfRelease: 2019,
    rating: 8.1,
    addedAt: "2025-01-04",
  },
  {
    id: 24,
    title: "The Past",
    genres: ["drama"],
    yearOfRelease: 2013,
    rating: 7.8,
    addedAt: "2025-02-19",
  },
];

// ---------------------------------------------------------------------------
// Derived data for all sections
// ---------------------------------------------------------------------------

const genreData = (() => {
  const counts: Record<string, number> = {};
  userMovies.forEach((m) =>
    m.genres.forEach((g) => {
      counts[g] = (counts[g] ?? 0) + 1;
    }),
  );
  return Object.entries(counts)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count);
})();

const GENRE_COLORS = [
  "#9b56f0",
  "#7c3aed",
  "#a78bfa",
  "#6d28d9",
  "#c4b5fd",
  "#5b21b6",
  "#ddd6fe",
  "#4c1d95",
];

const yearlyData = (() => {
  const counts: Record<string, number> = {};
  userMovies.forEach((m) => {
    const year = String(m.yearOfRelease);
    counts[year] = (counts[year] ?? 0) + 1;
  });
  return Object.entries(counts)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([year, count]) => ({ label: year, count }));
})();

// ---------------------------------------------------------------------------
// Taste evolution — derived from data
// ---------------------------------------------------------------------------

interface EvolutionPeriod {
  label: string;
  topGenres: string[];
  avgRating: number;
  filmCount: number;
  from: string;
  to: string;
}

function pluralFilms(n: number): string {
  return n === 1 ? "film" : "films";
}

function computePeriods(movies: UserMovie[]): EvolutionPeriod[] {
  const sorted = [...movies].sort((a, b) => a.addedAt.localeCompare(b.addedAt));
  const chunkSize = Math.ceil(sorted.length / 4);
  const labels = ["Start", "Period 2", "Period 3", "Now"];

  return Array.from({ length: 4 }, (_, i) => {
    const chunk = sorted.slice(i * chunkSize, (i + 1) * chunkSize);
    const genreCounts: Record<string, number> = {};
    let ratingSum = 0;

    chunk.forEach((m) => {
      m.genres.forEach((g) => {
        genreCounts[g] = (genreCounts[g] ?? 0) + 1;
      });
      ratingSum += m.rating;
    });

    const topGenres = Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([g]) => g);

    return {
      label: labels[i],
      topGenres,
      avgRating: chunk.length ? Math.round((ratingSum / chunk.length) * 10) / 10 : 0,
      filmCount: chunk.length,
      from: chunk[0]?.addedAt?.slice(0, 7) ?? "",
      to: chunk[chunk.length - 1]?.addedAt?.slice(0, 7) ?? "",
    };
  });
}

// Taste profile — four scales, value 0–100 (0 = left pole, 100 = right pole)
// In production this comes from the API based on the user’s genres
const tasteScales = [
  {
    id: "meaning",
    left: "Entertainment",
    right: "Meaning",
    value: 72,
  },
  {
    id: "intensity",
    left: "Light",
    right: "Heavy",
    value: 65,
  },
  {
    id: "mainstream",
    left: "Mainstream",
    right: "Arthouse",
    value: 58,
  },
  {
    id: "era",
    left: "Contemporary",
    right: "Classic",
    value: 60,
  },
];

// Summary taste label — determined on the backend from the scales
const tasteLabel = {
  title: "Tension seeker",
  description:
    "You’re not afraid of the dark side of film. Blood, suspense, and adrenaline are your element.",
  emoji: "⚡",
};

// Era: average release year across the collection (from API)
const eraAvgYear = 2007;

const eraInsight = (() => {
  if (eraAvgYear < 1985) return "You’re a true classic cinema lover";
  if (eraAvgYear < 2000) return "You’re drawn to the golden age of the 80s and 90s";
  if (eraAvgYear < 2011) return "Your comfort zone is 2000s cinema";
  if (eraAvgYear < 2020) return "You keep up with films from the last decade";
  return "You’re on top of new releases";
})();

// Rating bar: average rating then vs now
const ratingShift = { before: 6.8, after: 8.1 };

type ArchetypeKey = "intellectual" | "escapist" | "emotional" | "tension" | "explorer";

interface Archetype {
  key: ArchetypeKey;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bg: string;
}

const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  intellectual: {
    key: "intellectual",
    title: "Intellectual explorer",
    description:
      "You look for meaning beyond the frame. Arthouse, strong scripts, and high ratings are your standard.",
    emoji: "🎭",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  escapist: {
    key: "escapist",
    title: "Escapist",
    description: "For you, film is travel to other worlds. Fantasy, adventure, and spectacle.",
    emoji: "🚀",
    color: "text-emerald-accent",
    bg: "bg-emerald-accent/10 border-emerald-accent/20",
  },
  emotional: {
    key: "emotional",
    title: "Emotional viewer",
    description: "You watch with your heart. Melodramas, dramas, and stories that hit home.",
    emoji: "🌊",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  tension: {
    key: "tension",
    title: "Tension seeker",
    description:
      "Adrenaline and suspense are your element. Thrillers, crime, and horror keep you on edge.",
    emoji: "⚡",
    color: "text-gold",
    bg: "bg-gold/10 border-gold/20",
  },
  explorer: {
    key: "explorer",
    title: "Omnivore explorer",
    description: "You’re not boxed in by genre. Variety and curiosity are your hallmarks.",
    emoji: "🔭",
    color: "text-zinc-muted",
    bg: "bg-zinc-muted/10 border-zinc-muted/20",
  },
};

function computeArchetype(movies: UserMovie[]): Archetype {
  const recent = [...movies]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, Math.ceil(movies.length * 0.4));

  const counts: Record<string, number> = {};
  let artHighRating = 0;
  let adventure = 0;
  let emotional = 0;
  let tension = 0;

  recent.forEach((m) => {
    m.genres.forEach((g) => {
      counts[g] = (counts[g] ?? 0) + 1;
    });
    if (
      (m.genres.includes("drama") || m.genres.includes("mystery") || m.genres.includes("crime"))
      && m.rating >= 7.8
    )
      artHighRating++;
    if (
      m.genres.includes("fantasy")
      || m.genres.includes("adventure")
      || m.genres.includes("sci-fi")
    )
      adventure++;
    if (m.genres.includes("melodrama")) emotional++;
    if (m.genres.includes("thriller") || m.genres.includes("horror")) tension++;
  });

  const total = recent.length || 1;
  const uniqueGenres = Object.keys(counts).length;

  if (artHighRating / total > 0.4) return ARCHETYPES.intellectual;
  if (adventure / total > 0.4) return ARCHETYPES.escapist;
  if (emotional / total > 0.3) return ARCHETYPES.emotional;
  if (tension / total > 0.4) return ARCHETYPES.tension;
  if (uniqueGenres >= 6) return ARCHETYPES.explorer;
  return ARCHETYPES.intellectual;
}

const evolutionPeriods = computePeriods(userMovies);
const viewerArchetype = computeArchetype(userMovies);

// ---------------------------------------------------------------------------
// Summary widget data
// ---------------------------------------------------------------------------

const totalFilms = userMovies.length;

const topGenre = genreData[0] ?? { genre: "—", count: 0 };

const favoriteDecade = (() => {
  const counts: Record<string, number> = {};
  userMovies.forEach((m) => {
    const decade = `${Math.floor(m.yearOfRelease / 10) * 10}s`;
    counts[decade] = (counts[decade] ?? 0) + 1;
  });
  return Object.entries(counts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "—";
})();

// Top country (mock — country is not stored on UserMovie)
const topCountry = { name: "USA", count: 10 };

const CustomPieTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border rounded-lg px-3 py-2 text-sm">
        <p className="text-foreground font-medium">{payload[0].name}</p>
        <p className="text-zinc-muted">{payload[0].value} films</p>
      </div>
    );
  }
  return null;
};

type GenreTab = "genres" | "years";

export default function StatisticsPage() {
  const [genreTab, setGenreTab] = useState<GenreTab>("genres");

  const pieData =
    genreTab === "genres" ? genreData : yearlyData.map((d) => ({ genre: d.label, count: d.count }));

  return (
    <div className="max-w-410 w-full mx-auto px-6 pt-20 pb-16">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Statistics</h1>
        <p className="text-sm text-zinc-muted mt-1">A breakdown of your movie taste</p>
      </header>

      {/* Summary widgets */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {/* Total films */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-muted">Total films</p>
            <div className="flex items-center justify-center size-8 rounded-lg bg-accent/10 shrink-0">
              <Film className="size-4 text-accent" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground tabular-nums">{totalFilms}</p>
          <p className="text-sm text-zinc-muted">across all collections</p>
        </div>

        {/* Top country */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-muted">Top country</p>
            <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-accent/10 shrink-0">
              <MapPin className="size-4 text-emerald-accent" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground tabular-nums">{topCountry.name}</p>
          <p className="text-sm text-zinc-muted">{topCountry.count} films</p>
        </div>

        {/* Top genre */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-muted">Top genre</p>
            <div className="flex items-center justify-center size-8 rounded-lg bg-accent/10 shrink-0">
              <Clapperboard className="size-4 text-accent" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground capitalize">{topGenre.genre}</p>
          <p className="text-sm text-zinc-muted">{topGenre.count} films</p>
        </div>

        {/* Favorite decade */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-muted">Favorite decade</p>
            <div className="flex items-center justify-center size-8 rounded-lg bg-gold/10 shrink-0">
              <CalendarDays className="size-4 text-gold" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground tabular-nums">{favoriteDecade}</p>
          <p className="text-sm text-zinc-muted">by release year</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Genre chart */}
        <section className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
          {/* Header + tab switcher */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center justify-center size-8 rounded-lg transition-colors",
                  genreTab === "genres" ? "bg-accent/10" : "bg-gold/10",
                )}
              >
                {genreTab === "genres" ?
                  <BarChart2 className="size-4 text-accent" />
                : <CalendarDays className="size-4 text-gold" />}
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  {genreTab === "genres" ? "Genres" : "By year"}
                </h2>
                <p className="text-sm text-zinc-muted">
                  {genreTab === "genres" ?
                    "Which genres you add most often"
                  : "Films in your collection by release year"}
                </p>
              </div>
            </div>

            {/* Pill tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-subtle border border-border">
              <button
                type="button"
                onClick={() => setGenreTab("genres")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  genreTab === "genres" ?
                    "bg-accent text-accent-foreground shadow-sm"
                  : "text-zinc-muted hover:text-foreground",
                )}
              >
                <BarChart2 className="size-3.5" />
                <span>Genres</span>
              </button>
              <button
                type="button"
                onClick={() => setGenreTab("years")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  genreTab === "years" ?
                    "bg-gold text-background shadow-sm"
                  : "text-zinc-muted hover:text-foreground",
                )}
              >
                <CalendarDays className="size-3.5" />
                <span>By year</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_180px] gap-4 items-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="count"
                  nameKey="genre"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={GENRE_COLORS[index % GENRE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-col gap-2">
              {pieData.map((item, index) => (
                <div key={item.genre} className="flex items-center gap-2">
                  <span
                    className="inline-block size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: GENRE_COLORS[index % GENRE_COLORS.length] }}
                  />
                  <span className="text-sm text-zinc-muted truncate flex-1">{item.genre}</span>
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Google Maps placeholder */}
        <section className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-accent/10">
              <MapPin className="size-4 text-emerald-accent" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Cinema geography</h2>
              <p className="text-sm text-zinc-muted">Where your favorite films come from</p>
            </div>
          </div>

          <div className="flex-1 min-h-65 rounded-xl overflow-hidden bg-[#1a1a2e] border border-border relative flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 40%, #9b56f0 0%, transparent 40%),
                  radial-gradient(circle at 70% 60%, #10b981 0%, transparent 40%)`,
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
              <div className="flex items-center justify-center size-12 rounded-full bg-surface-elevated border border-border">
                <MapPin className="size-6 text-zinc-muted" />
              </div>
              <p className="text-sm font-medium text-foreground">Map coming soon</p>
              <p className="text-sm text-zinc-muted leading-relaxed">
                An interactive map of countries of origin for your films will appear here
              </p>
            </div>
          </div>
        </section>

        {/* Taste evolution (PRO) */}
        <section className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-6 xl:col-span-2 relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-gold/10">
              <Film className="size-4 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-foreground">Taste evolution</h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold/10 border border-gold/20 text-gold text-sm font-medium">
                  <Lock className="size-3" />
                  <span>PRO</span>
                </span>
              </div>
              <p className="text-sm text-zinc-muted">
                How your relationship with film changed over time
              </p>
            </div>
          </div>

          {/* Viewer archetype */}
          <div className={cn("flex items-start gap-4 rounded-xl border p-5", viewerArchetype.bg)}>
            <span className="text-3xl leading-none mt-0.5">{viewerArchetype.emoji}</span>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm text-zinc-muted">Your viewer archetype</p>
                <span className={cn("text-sm font-semibold", viewerArchetype.color)}>
                  {viewerArchetype.title}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {viewerArchetype.description}
              </p>
            </div>
          </div>

          {/* Taste timeline */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">Taste timeline</p>
            <div className="relative">
              {/* Connector line */}
              <div className="absolute top-5 left-5 right-5 h-px bg-border hidden sm:block" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {evolutionPeriods.map((period, i) => {
                  const isLast = i === evolutionPeriods.length - 1;
                  return (
                    <div key={period.label} className="flex flex-col items-center gap-3">
                      {/* Point on line */}
                      <div
                        className={cn(
                          "relative z-10 flex items-center justify-center size-10 rounded-full border-2 shrink-0",
                          isLast ?
                            "bg-accent border-accent text-accent-foreground"
                          : "bg-surface border-border text-zinc-muted",
                        )}
                      >
                        <span className="text-sm font-bold tabular-nums">{i + 1}</span>
                      </div>

                      {/* Period card */}
                      <div
                        className={cn(
                          "w-full flex flex-col gap-2 rounded-xl border p-3",
                          isLast ?
                            "bg-accent/5 border-accent/20"
                          : "bg-surface-subtle border-border",
                        )}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              isLast ? "text-accent" : "text-foreground",
                            )}
                          >
                            {period.label}
                          </span>
                          {isLast && <Sparkles className="size-3.5 text-accent shrink-0" />}
                        </div>
                        <p className="text-sm text-zinc-muted leading-none tabular-nums">
                          {period.from} — {period.to}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {period.topGenres.map((g) => (
                            <span
                              key={g}
                              className="inline-block px-2 py-0.5 rounded-md bg-border/60 text-sm text-foreground capitalize"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-col gap-0.5 mt-0.5">
                          <p className="text-sm text-zinc-muted">
                            Added{" "}
                            <span className="font-medium text-foreground tabular-nums">
                              {period.filmCount} {pluralFilms(period.filmCount)}
                            </span>
                          </p>
                          <p className="text-sm text-zinc-muted">
                            Average rating{" "}
                            <span className="inline-flex items-center gap-1 font-medium text-foreground tabular-nums">
                              <span aria-hidden>⭐</span>
                              {period.avgRating}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Key shifts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Widget 1: Taste profile */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-subtle p-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-7 rounded-md bg-accent/10 shrink-0">
                  <BarChart2 className="size-3.5 text-accent" />
                </div>
                <p className="text-sm font-semibold text-foreground">Taste profile</p>
              </div>

              {/* Four scales */}
              <div className="flex flex-col gap-4">
                {tasteScales.map((scale) => (
                  <div key={scale.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-muted">{scale.left}</span>
                      <span className="text-zinc-muted">{scale.right}</span>
                    </div>
                    <div className="relative h-2 bg-border/50 rounded-full">
                      {/* Track fill from center to thumb */}
                      <div
                        className={cn(
                          "absolute top-0 h-full rounded-full bg-accent/40",
                          scale.value >= 50 ? "left-1/2" : "right-1/2",
                        )}
                        style={{
                          width: `${Math.abs(scale.value - 50)}%`,
                          ...(scale.value < 50 && { left: `${scale.value}%` }),
                        }}
                      />
                      {/* Thumb */}
                      <div
                        className="absolute top-1/2 size-4 rounded-full border-2 border-accent bg-surface-subtle shadow-sm"
                        style={{
                          left: `${scale.value}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary label */}
              <div className="flex items-start gap-2.5 rounded-lg bg-accent/5 border border-accent/15 px-3 py-2.5 mt-auto">
                <span className="text-base leading-none mt-0.5">{tasteLabel.emoji}</span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-foreground">{tasteLabel.title}</p>
                  <p className="text-sm text-zinc-muted leading-relaxed">
                    {tasteLabel.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Widget 2: Cinema era */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-subtle p-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-7 rounded-md bg-gold/10 shrink-0">
                  <Clock className="size-3.5 text-gold" />
                </div>
                <p className="text-sm font-semibold text-foreground">Cinema era</p>
              </div>
              <p className="text-sm text-zinc-muted -mt-1">{eraInsight}</p>

              {/* Single-thumb scale */}
              <div className="flex flex-col gap-2 flex-1 justify-center">
                <div className="flex items-center justify-between text-sm text-zinc-muted">
                  <span>1960s</span>
                  <span>Today</span>
                </div>
                <div className="relative h-2 bg-border/50 rounded-full">
                  {/* Fill from start to thumb */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gold/40"
                    style={{
                      width: `${Math.round(((eraAvgYear - 1960) / (2025 - 1960)) * 100)}%`,
                    }}
                  />
                  {/* Thumb */}
                  <div
                    className="absolute top-1/2 size-4 rounded-full border-2 border-gold bg-surface-subtle shadow-sm"
                    style={{
                      left: `${Math.round(((eraAvgYear - 1960) / (2025 - 1960)) * 100)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
                <p className="text-sm text-foreground font-medium tabular-nums">
                  Average year: <span className="text-gold">{eraAvgYear}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-gold/5 border border-gold/15 px-3 py-2 mt-auto">
                <Clock className="size-3.5 text-gold shrink-0" />
                <p className="text-sm text-zinc-muted">{eraInsight}</p>
              </div>
            </div>

            {/* Widget 3: Rating bar */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-subtle p-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-7 rounded-md bg-emerald-accent/10 shrink-0">
                  <TrendingUp className="size-3.5 text-emerald-accent" />
                </div>
                <p className="text-sm font-semibold text-foreground">Rating standards</p>
              </div>
              <p className="text-sm text-zinc-muted -mt-1">
                You got pickier — your average rating went up
              </p>

              {/* Two large numbers */}
              <div className="flex items-end gap-4 flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-zinc-muted">Before</span>
                  <span className="text-3xl font-bold text-zinc-muted tabular-nums">
                    {ratingShift.before}
                  </span>
                </div>
                <ArrowRight className="size-5 text-zinc-muted/40 mb-2 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-zinc-muted">Now</span>
                  <span className="text-3xl font-bold text-emerald-accent tabular-nums">
                    {ratingShift.after}
                  </span>
                </div>
              </div>

              {/* Progress out of 10 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-border/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-zinc-muted/40"
                      style={{ width: `${(ratingShift.before / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-zinc-muted tabular-nums w-6 text-right shrink-0">
                    {ratingShift.before}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-border/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-accent"
                      style={{ width: `${(ratingShift.after / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-emerald-accent tabular-nums w-6 text-right shrink-0">
                    {ratingShift.after}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-emerald-accent/5 border border-emerald-accent/15 px-3 py-2">
                <TrendingUp className="size-3.5 text-emerald-accent shrink-0" />
                <p className="text-sm text-zinc-muted">
                  Up by{" "}
                  <span className="text-foreground font-medium">
                    +{Math.round((ratingShift.after - ratingShift.before) * 10) / 10} points
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
