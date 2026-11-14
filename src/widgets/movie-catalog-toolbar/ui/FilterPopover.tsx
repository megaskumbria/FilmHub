"use client";

import { Popover, PopoverContent, PopoverTrigger, Button } from "@/shared/ui";
import { RotateCcw } from "lucide-react";
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
        sideOffset={8}
        className="w-80 overflow-hidden rounded-2xl border border-border/50 bg-graphite p-0 shadow-2xl"
      >
        <div className="px-4 pt-4">
          <h3 className="font-unbounded text-sm font-semibold tracking-tight text-foreground">
            {t("filterTitle")}
          </h3>
        </div>

        <div className="flex flex-col gap-4 px-4 py-4">
          <YearSelect />
          <SortSelect />
          <CountrySelect />
        </div>

        <AnimatePresence initial={false}>
          {hasActiveFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/50 px-4 pt-3 pb-4">
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="accent"
                  className="h-10 w-full gap-2 rounded-lg active:scale-[0.98]"
                >
                  <RotateCcw className="size-4" />
                  {t("reset")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};
