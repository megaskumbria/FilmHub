"use client";

import { Popover, PopoverContent, PopoverTrigger, Button } from "@/shared/ui";
import { Filter, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GenreSelect } from "./GenreSelect";
import { YearSelect } from "./YearSelect";
import { SortSelect } from "./SortSelect";

export const FilterPopover = () => {
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
    <Popover>
      <PopoverTrigger asChild className="group">
        <Button className="flex justify-center gap-x-2 relative h-10 px-2 max-w-32 w-full rounded-lg bg-graphite border border-border/40 hover:bg-surface hover:border-accent/30 shadow-sm hover:shadow-accent/10 transition-all duration-300 text-sm font-medium">
          <Filter className="size-4 group-data-[state=open]:rotate-90 transition-transform duration-300" />

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
          <header className="px-5 py-4 border-b border-border/50 bg-linear-to-br from-accent/5 to-transparent">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Filter className="size-4 text-accent" />
              </div>
              <h3 className="font-semibold text-base">Фильтры поиска</h3>
            </div>
          </header>

          <div className="p-4 space-y-4">
            <GenreSelect value={selectedGenre} onValueChange={setSelectedGenre} />
            <YearSelect value={selectedYear} onValueChange={setSelectedYear} />
            <SortSelect value={selectedSort} onValueChange={setSelectedSort} />
          </div>

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.footer
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "65px" }}
                exit={{ opacity: 0, height: "0px" }}
                className="px-4 pb-4 pt-2 border-t border-border/50 overflow-hidden"
              >
                <Button
                  onClick={handleReset}
                  className="active:scale-95 w-full h-10 rounded-lg flex items-center justify-center gap-2"
                  variant="accent"
                >
                  <RotateCcw className="size-4" />
                  Сбросить
                </Button>
              </motion.footer>
            )}
          </AnimatePresence>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
