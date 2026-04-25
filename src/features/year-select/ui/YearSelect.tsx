"use client";

import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { DATA_YEARS } from "../model/dataYears";
import { useMediaCatalog } from "@/shared/model/stores/movie-catalog";

export const YearSelect = () => {
  const { selectedYear, setSelectedYear } = useMediaCatalog();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
      className="space-y-2"
    >
      <Label className="text-xs font-medium text-muted flex items-center gap-1.5">
        <Calendar className="size-3.5" />
        Release year
      </Label>

      <Select value={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger className="cursor-pointer w-full h-10 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={8}
          className="bg-graphite border-border/40 shadow-xl"
        >
          {DATA_YEARS.map((year) => (
            <SelectItem key={year.value} value={year.value}>
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};
