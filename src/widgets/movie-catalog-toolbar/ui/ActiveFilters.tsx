"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { IconArrowsSort, IconCalendar, IconWorld } from "@tabler/icons-react";
import { Button } from "@/shared/ui";
import { DATA_YEARS, useFilterMedia } from "@/features";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";

interface FilterChip {
  key: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  onRemove: () => void;
}

export const ActiveFilters = () => {
  const t = useTranslations("catalog");
  const {
    selectedGenre,
    setSelectedGenre,
    selectedYear,
    setSelectedYear,
    selectedSort,
    setSelectedSort,
    selectedCountry,
    setSelectedCountry,
  } = useFilterMedia();

  const resetCountry = () => setSelectedCountry({ iso31661: "", englishName: "", nativeName: "" });

  const translatedYear = selectedYear === "before-1990" || selectedYear === "2020-today";

  const yearLabel =
    translatedYear ?
      t(`years.${selectedYear}`)
    : DATA_YEARS.find((year) => year.value === selectedYear)?.label;

  const chips: FilterChip[] = [];

  if (selectedYear) {
    chips.push({
      key: "year",
      icon: IconCalendar,
      label: yearLabel ?? selectedYear,
      onRemove: () => setSelectedYear(""),
    });
  }

  if (selectedSort) {
    chips.push({
      key: "sort",
      icon: IconArrowsSort,
      label: t(`sortOptions.${selectedSort}`),
      onRemove: () => setSelectedSort(""),
    });
  }

  if (selectedCountry.iso31661) {
    chips.push({
      key: "country",
      icon: IconWorld,
      label: selectedCountry.nativeName,
      onRemove: resetCountry,
    });
  }

  const hasAnyFilter = chips.length > 0 || Boolean(selectedGenre.id);

  const handleResetAll = () => {
    setSelectedGenre({ id: "", name: "" });
    setSelectedYear("");
    setSelectedSort("");
    resetCountry();
  };

  return (
    <AnimatePresence initial={false}>
      {hasAnyFilter && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <ul className="flex flex-wrap items-center gap-2 pt-4">
            <AnimatePresence initial={false} mode="popLayout">
              {chips.map(({ key, icon: Icon, label, onRemove }) => (
                <motion.li
                  key={key}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.18 }}
                  className="flex h-9 items-center gap-2 rounded-full border border-accent/30 bg-accent/10 pl-3 pr-1"
                >
                  <Icon className="size-4 text-accent" />

                  <span className="text-sm font-medium text-zinc-light">{label}</span>

                  <Button
                    type="button"
                    onClick={onRemove}
                    className="group size-7 rounded-full hover:bg-accent/20 transition-colors duration-200"
                  >
                    <X className="size-3.5 text-zinc-muted group-hover:text-accent transition-colors" />
                  </Button>
                </motion.li>
              ))}

              <motion.li key="reset" layout>
                <Button
                  type="button"
                  onClick={handleResetAll}
                  className="group h-9 rounded-full px-3 transition-colors duration-200 hover:bg-graphite"
                >
                  <span className="text-sm font-medium text-zinc-muted transition-colors duration-200 group-hover:text-foreground">
                    {t("resetAll")}
                  </span>
                </Button>
              </motion.li>
            </AnimatePresence>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
