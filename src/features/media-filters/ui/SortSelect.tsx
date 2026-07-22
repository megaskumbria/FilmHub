"use client";

import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { DATA_SORT_OPTIONS } from "../model/dataSortOptions";
import { useFilterMedia } from "../model/filter-media-store";

export const SortSelect = () => {
  const { selectedSort, setSelectedSort } = useFilterMedia();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-2"
    >
      <Label className="text-xs font-medium text-muted flex items-center gap-1.5">
        <ArrowUpDown className="size-3.5" />
        Sort
      </Label>

      <Select value={selectedSort} onValueChange={setSelectedSort}>
        <SelectTrigger className="cursor-pointer w-full h-10 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
          <SelectValue placeholder="Select sort" />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={8}
          className="bg-graphite border-border/40 shadow-xl"
        >
          {DATA_SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};
