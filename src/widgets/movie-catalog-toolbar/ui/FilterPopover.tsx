"use client";

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
} from "@/shared/ui";
import { Filter, Film, Calendar, ArrowUpDown, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

export const FilterPopover = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const hasActiveFilters = selectedGenre || selectedYear || selectedSort;

  const handleReset = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedSort("");
  };

  return (
    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <PopoverTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="flex gap-x-2 relative h-10 px-2 max-w-32 w-full rounded-lg bg-graphite border border-border/40 hover:bg-surface hover:border-accent/30 shadow-sm hover:shadow-accent/10 transition-all duration-300 text-sm font-medium">
            <motion.div animate={{ rotate: isFilterOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
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
        className="w-80 p-0 rounded-2xl bg-surface border border-border/40 shadow-2xl shadow-accent/5 overflow-hidden"
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
                  className="bg-graphite border-border/40 shadow-xl"
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
                  className="bg-graphite border-border/40 shadow-xl"
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
                  className="bg-graphite border-border/40 shadow-xl"
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
  );
};
