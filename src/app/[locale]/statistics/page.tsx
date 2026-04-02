"use client";

import { MapPin, Lock, TrendingUp, Film, BarChart2, Clock } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

const genreData = [
  { genre: "Драма", count: 47 },
  { genre: "Триллер", count: 34 },
  { genre: "Фантастика", count: 28 },
  { genre: "Криминал", count: 22 },
  { genre: "Комедия", count: 18 },
  { genre: "Ужасы", count: 14 },
  { genre: "Биография", count: 11 },
  { genre: "Мелодрама", count: 9 },
];

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

const decadeData = [
  { year: "1960", count: 2 },
  { year: "1965", count: 3 },
  { year: "1970", count: 4 },
  { year: "1975", count: 6 },
  { year: "1980", count: 5 },
  { year: "1985", count: 7 },
  { year: "1990", count: 14 },
  { year: "1995", count: 18 },
  { year: "2000", count: 11 },
  { year: "2005", count: 9 },
  { year: "2010", count: 21 },
  { year: "2015", count: 16 },
  { year: "2020", count: 19 },
  { year: "2023", count: 12 },
];

const tasteInsight = "Твой вкус тяготеет к кино 90-х и 2010-х";

const evolutionEarly = [
  { axis: "Простое", value: 80 },
  { axis: "Эмоциональное", value: 75 },
  { axis: "Зрелищное", value: 70 },
  { axis: "Современное", value: 65 },
  { axis: "Мейнстрим", value: 85 },
];

const evolutionNow = [
  { axis: "Простое", value: 35 },
  { axis: "Эмоциональное", value: 50 },
  { axis: "Зрелищное", value: 30 },
  { axis: "Современное", value: 40 },
  { axis: "Мейнстрим", value: 30 },
];

const shiftData = [
  {
    axis: "Простое ↔ Сложное",
    раньше: 80,
    сейчас: 35,
    leftLabel: "Простое",
    rightLabel: "Сложное",
  },
  {
    axis: "Эмоц. ↔ Интеллект.",
    раньше: 75,
    сейчас: 50,
    leftLabel: "Эмоц.",
    rightLabel: "Интеллект.",
  },
  {
    axis: "Зрелищное ↔ Созерц.",
    раньше: 70,
    сейчас: 30,
    leftLabel: "Зрелищное",
    rightLabel: "Созерц.",
  },
  {
    axis: "Современное ↔ Ретро",
    раньше: 65,
    сейчас: 40,
    leftLabel: "Современное",
    rightLabel: "Ретро",
  },
  {
    axis: "Мейнстрим ↔ Артхаус",
    раньше: 85,
    сейчас: 30,
    leftLabel: "Мейнстрим",
    rightLabel: "Артхаус",
  },
];

const CustomRadarTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border rounded-lg px-3 py-2 text-sm">
        {payload.map((entry) => (
          <div key={entry.name} className="text-foreground">
            <span className="text-zinc-muted">{entry.name}: </span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLineTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border rounded-lg px-3 py-2 text-sm">
        <p className="text-zinc-muted">{label}</p>
        <p className="text-foreground font-medium">{payload[0].value} фильмов</p>
      </div>
    );
  }
  return null;
};

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
        <p className="text-zinc-muted">{payload[0].value} фильмов</p>
      </div>
    );
  }
  return null;
};

export default function StatisticsPage() {
  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Статистика</h1>
        <p className="text-sm text-zinc-muted mt-1">Анализ твоего кинематографического вкуса</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Жанровая диаграмма */}
        <section className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-accent/10">
              <BarChart2 className="size-4 text-accent" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Жанры</h2>
              <p className="text-sm text-zinc-muted">Какие жанры ты добавляешь чаще всего</p>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_180px] gap-4 items-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="count"
                  nameKey="genre"
                >
                  {genreData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={GENRE_COLORS[index % GENRE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-col gap-2">
              {genreData.map((item, index) => (
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

        {/* Google Maps заглушка */}
        <section className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-accent/10">
              <MapPin className="size-4 text-emerald-accent" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">География кино</h2>
              <p className="text-sm text-zinc-muted">Откуда родом твои любимые фильмы</p>
            </div>
          </div>

          <div className="flex-1 min-h-[260px] rounded-xl overflow-hidden bg-[#1a1a2e] border border-border relative flex items-center justify-center">
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
              <p className="text-sm font-medium text-foreground">Карта скоро появится</p>
              <p className="text-sm text-zinc-muted leading-relaxed">
                Здесь будет интерактивная карта с распределением стран происхождения твоих фильмов
              </p>
            </div>
          </div>
        </section>

        {/* Временной срез */}
        <section className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5 xl:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-gold/10">
              <Clock className="size-4 text-gold" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Временной срез</h2>
              <p className="text-sm text-zinc-muted">Какое кино ты смотришь и как менялся вкус</p>
            </div>
          </div>

          <div className="bg-accent/5 border border-accent/15 rounded-xl px-5 py-3 flex items-start gap-3">
            <TrendingUp className="size-4 text-accent mt-0.5 shrink-0" />
            <p className="text-sm text-foreground font-medium">{tasteInsight}</p>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={decadeData} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fill: "#737373", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomLineTooltip />} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#9b56f0"
                strokeWidth={2.5}
                dot={{ fill: "#9b56f0", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#9b56f0", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* Эволюция вкуса (PRO) */}
        <section className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5 xl:col-span-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-gold/10">
                <Film className="size-4 text-gold" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">Эволюция вкуса</h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold/10 border border-gold/20 text-gold text-sm font-medium">
                    <Lock className="size-3" />
                    PRO
                  </span>
                </div>
                <p className="text-sm text-zinc-muted">От 20+ добавленных фильмов</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Radar comparison */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-foreground">Профиль вкуса: тогда и сейчас</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-0.5 rounded bg-zinc-muted" />
                  <span className="text-zinc-muted">Раньше</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-0.5 rounded bg-accent" />
                  <span className="text-zinc-muted">Сейчас</span>
                </span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart
                  data={evolutionEarly.map((item, i) => ({
                    axis: item.axis,
                    Раньше: item.value,
                    Сейчас: evolutionNow[i].value,
                  }))}
                >
                  <PolarGrid stroke="#27272a" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: "#737373", fontSize: 12 }} />
                  <Radar
                    name="Раньше"
                    dataKey="Раньше"
                    stroke="#737373"
                    fill="#737373"
                    fillOpacity={0.12}
                    strokeWidth={1.5}
                  />
                  <Radar
                    name="Сейчас"
                    dataKey="Сейчас"
                    stroke="#9b56f0"
                    fill="#9b56f0"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip content={<CustomRadarTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Shift bars */}
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-foreground">Сдвиг подхода к кино</p>
              <div className="flex flex-col gap-5">
                {shiftData.map((item) => {
                  const earlierWidth = item.раньше;
                  const nowWidth = item.сейчас;
                  return (
                    <div key={item.axis} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-muted">{item.leftLabel}</span>
                        <span className="text-zinc-muted text-sm">{item.axis}</span>
                        <span className="text-zinc-muted">{item.rightLabel}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-zinc-muted w-14 text-right tabular-nums shrink-0">
                            Раньше
                          </span>
                          <div className="flex-1 h-5 bg-border/40 rounded-md overflow-hidden">
                            <div
                              className="h-full rounded-md bg-zinc-muted/40 transition-all"
                              style={{ width: `${earlierWidth}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-zinc-muted w-14 text-right tabular-nums shrink-0">
                            Сейчас
                          </span>
                          <div className="flex-1 h-5 bg-border/40 rounded-md overflow-hidden">
                            <div
                              className="h-full rounded-md bg-accent/60 transition-all"
                              style={{ width: `${nowWidth}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
