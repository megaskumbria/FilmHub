"use client";

import { Popover, PopoverContent, PopoverTrigger, Button } from "@/shared/ui";
import { Filter, RotateCcw } from "lucide-react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { YearSelect, SortSelect, CountrySelect, useFilterMedia } from "@/features";
import { useTranslations } from "next-intl";

export const FilterPopover = () => {
  const t = useTranslations("catalog");
  const {
    selectedYear,
    setSelectedYear,
    selectedSort,
    setSelectedSort,
    selectedCountry,
    setSelectedCountry,
  } = useFilterMedia();

  const activeFiltersCount = [selectedYear, selectedSort, selectedCountry.iso31661].filter(
    Boolean,
  ).length;
  const hasActiveFilters = activeFiltersCount > 0;

  const handleReset = () => {
    setSelectedYear("");
    setSelectedSort("");
    setSelectedCountry({ iso31661: "", englishName: "", nativeName: "" });
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="group">
        <Button className="relative shrink-0 h-11 gap-x-2 rounded-full border border-border/40 bg-graphite px-4 hover:border-accent/40 hover:bg-surface data-[state=open]:border-accent/50 data-[state=open]:bg-surface transition-colors duration-300">
          <IconAdjustmentsHorizontal className="size-4.5 text-zinc-muted group-hover:text-accent group-data-[state=open]:text-accent transition-colors" />

          <span className="hidden text-sm font-medium sm:inline">{t("filters")}</span>

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex size-5 items-center justify-center rounded-full bg-accent"
              >
                <span className="text-sm font-semibold leading-none text-accent-foreground">
                  {activeFiltersCount}
                </span>
              </motion.span>
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
              <h3 className="font-semibold text-base">{t("filterTitle")}</h3>
            </div>
          </header>

          <div className="p-4 space-y-4">
            <YearSelect />
            <SortSelect />
            <CountrySelect />
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
                  <span>{t("reset")}</span>
                </Button>
              </motion.footer>
            )}
          </AnimatePresence>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
