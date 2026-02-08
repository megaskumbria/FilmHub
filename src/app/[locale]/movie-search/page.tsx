"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
import { mockMovies } from "@/shared/model/movies";
import { Filter, Plus, Film, Calendar, ArrowUpDown, RotateCcw, Search, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const tabs = [
  {
    label: "Новинки",
    value: "newest",
  },
  {
    label: "Фильмы",
    value: "movies",
  },
  {
    label: "Сериалы",
    value: "series",
  },
  {
    label: "Мультфильмы",
    value: "cartoons",
  },
];

const dataGenre = [
  { id: "Any genre", htmlFor: "Any genre", label: "Any genre", value: "any" },
  { id: "Action", htmlFor: "Action", label: "Action", value: "action" },
  { id: "Horror", htmlFor: "Horror", label: "Horror", value: "horror" },
  { id: "Comedy", htmlFor: "Comedy", label: "Comedy", value: "comedy" },
  { id: "Drama", htmlFor: "Drama", label: "Drama", value: "drama" },
  { id: "Thriller", htmlFor: "Thriller", label: "Thriller", value: "thriller" },
  { id: "Romance", htmlFor: "Romance", label: "Romance", value: "romance" },
  { id: "Sci-Fi", htmlFor: "Sci-Fi", label: "Sci-Fi", value: "sci-fi" },
  { id: "Detective", htmlFor: "Detective", label: "Detective", value: "detective" },
  { id: "Documentary", htmlFor: "Documentary", label: "Documentary", value: "documentary" },
  { id: "Animation", htmlFor: "Animation", label: "Animation", value: "animation" },
  { id: "Adventure", htmlFor: "Adventure", label: "Adventure", value: "adventure" },
  { id: "Historical", htmlFor: "Historical", label: "Historical", value: "historical" },
];

const dataYear = [
  { id: "All years", htmlFor: "All years", label: "All years", value: "all" },
  {
    id: "Before 1990",
    htmlFor: "Before 1990",
    label: "Before 1990",
    value: "before-1990",
  },
  { id: "1990-2000", htmlFor: "1990-2000", label: "1990-2000", value: "1990-2000" },
  { id: "2000-2010", htmlFor: "2000-2010", label: "2000-2010", value: "2000-2010" },
  { id: "2010-2020", htmlFor: "2010-2020", label: "2010-2020", value: "2010-2020" },
  {
    id: "2020-Today",
    htmlFor: "2020-Today",
    label: "2020-Today",
    value: "2020-today",
  },
];

const dataOptions = [
  { id: "rating", htmlFor: "rating", label: "By rating", value: "rating" },
  { id: "newest", htmlFor: "newest", label: "Newest first", value: "newest" },
  { id: "oldest", htmlFor: "oldest", label: "Oldest first", value: "oldest" },
  { id: "az", htmlFor: "az", label: "By name: A-Z", value: "az" },
  { id: "za", htmlFor: "za", label: "By name: Z-A", value: "za" },
];

export default function MovieSearchPage() {
  const [activeTab, setActiveTab] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const hasActiveFilters = selectedGenre || selectedYear || selectedSort;

  const handleReset = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedSort("");
  };

  return (
    <div className="max-w-[1640px] w-full mx-auto p-4">
      {/* Поиск сверху, компактный */}
      <section className="mb-5">
        <div className="relative max-w-2xl">
          <motion.div
            className="absolute inset-0 rounded-lg bg-linear-to-r from-accent/15 to-accent/5 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isSearchFocused ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <div className="relative flex items-center">
            <Search
              className="absolute left-3 size-4 text-muted transition-colors pointer-events-none"
              style={{ color: isSearchFocused ? "hsl(var(--accent))" : undefined }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Поиск фильмов, сериалов..."
              className="w-full h-10 pl-9 pr-9 rounded-lg bg-secondary/60 border border-border/50 focus:border-accent/50 focus:bg-secondary text-foreground text-sm placeholder:text-muted transition-all duration-200 outline-none"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  type="button"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 size-5 rounded-full bg-muted/20 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                >
                  <X className="size-3.5 text-muted group-hover:text-accent transition-colors" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Табы и фильтры в одну строку, одна высота */}
      <section className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
          <TabsList className="relative h-10 items-center justify-center rounded-lg bg-secondary/60 p-1 border border-border/50 gap-0.5">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="cursor-pointer relative z-10 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 data-[state=active]:text-accent-foreground data-[state=inactive]:text-muted hover:text-foreground"
              >
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-md bg-linear-to-br from-accent to-accent/80 shadow-md shadow-accent/20"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="relative h-10 px-4 rounded-lg bg-secondary/60 border border-border/50 hover:bg-secondary hover:border-accent/30 shadow-sm hover:shadow-accent/10 transition-all duration-300 text-sm font-medium">
                <motion.div
                  animate={{ rotate: isFilterOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Filter className="size-4" />
                </motion.div>
                <span>Фильтры</span>
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 size-5 rounded-full bg-accent border-2 border-background flex items-center justify-center"
                    >
                      <span className="text-[10px] font-bold text-white">
                        {[selectedGenre, selectedYear, selectedSort].filter(Boolean).length}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-80 p-0 rounded-2xl bg-secondary/95 backdrop-blur-sm border-border shadow-2xl shadow-accent/5 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-border/50 bg-linear-to-br from-accent/5 to-transparent">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Filter className="size-4 text-accent" />
                  </div>
                  <h3 className="font-semibold text-base">Фильтры поиска</h3>
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 space-y-4">
                {/* Genre */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                    <Film className="size-3.5" />
                    Жанр
                  </label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="w-full h-10 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
                      <SelectValue placeholder="Выберите жанр" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      sideOffset={8}
                      className="bg-secondary border-border shadow-xl"
                    >
                      {dataGenre.map((genre) => (
                        <SelectItem key={genre.value} value={genre.value}>
                          {genre.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Year */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    Год выпуска
                  </label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full h-10 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
                      <SelectValue placeholder="Выберите период" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      sideOffset={8}
                      className="bg-secondary border-border shadow-xl"
                    >
                      {dataYear.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Sort */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                    <ArrowUpDown className="size-3.5" />
                    Сортировка
                  </label>
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="w-full h-10 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
                      <SelectValue placeholder="Выберите порядок" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      sideOffset={8}
                      className="bg-secondary border-border shadow-xl"
                    >
                      {dataOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              {/* Footer */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4 pt-2 border-t border-border/50 bg-linear-to-t from-accent/5 to-transparent overflow-hidden"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      className="w-full h-10 rounded-lg bg-linear-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-semibold shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="size-4" />
                      Сбросить
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </PopoverContent>
        </Popover>
      </section>

      <ul className="grid grid-cols-5 gap-4">
        {mockMovies.map((movie) => {
          const { id, imgUrl, title, genres, description, yearOfRelease, rating } = movie;

          return (
            <Link href={`/movies/${id}`} key={id}>
              <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-border/50 bg-surface-elevated shadow-lg transition-all duration-300 hover:border-accent/40 hover:shadow-accent/10 hover:shadow-2xl hover:translate-y-[-2px]">
                {/* Обложка */}
                <div className="relative aspect-2/3 overflow-hidden bg-surface-subtle">
                  <Image
                    src={imgUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={200}
                    height={300}
                  />

                  {/* Минимальный градиент снизу для плавности */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-surface-subtle/60 to-transparent pointer-events-none" />

                  {/* Кнопка + */}
                  <Button
                    size="icon"
                    className="absolute top-3 right-3 size-9 rounded-full bg-background/90 backdrop-blur-md border border-border/60 text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent/80 hover:scale-110 shadow-lg transition-all duration-200 z-10"
                    aria-label="Добавить"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>

                {/* Информация */}
                <div className="flex flex-col p-4 gap-3 bg-linear-to-b from-surface-elevated to-surface-subtle">
                  {/* Рейтинги */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gold/15 border border-gold/30">
                      <span className="text-xs font-bold text-gold">★</span>
                      <span className="text-xs font-semibold text-gold">{rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/15 border border-accent/30">
                      <span className="text-xs font-bold text-accent">★</span>
                      <span className="text-xs font-semibold text-accent">
                        {(Number(rating) * 1.15).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Название и год */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-foreground line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs font-medium text-muted">{yearOfRelease}</p>
                  </div>

                  {/* Жанры */}
                  <ul className="flex flex-wrap gap-1.5">
                    {genres.slice(0, 3).map((genre, idx) => (
                      <li
                        key={idx}
                        className="rounded-md bg-secondary/60 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-foreground/80 border border-border/30"
                      >
                        {genre}
                      </li>
                    ))}
                  </ul>

                  {/* Описание */}
                  <p className="text-xs text-muted/90 line-clamp-2 leading-relaxed">
                    {description}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
