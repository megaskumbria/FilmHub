"use client";

import { useState } from "react";
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";
import { DATA_MOVIES_COUNT_OPTIONS } from "../model/dataMoviesCountOptions";

export const MoviesCountSelect = () => {
  // TODO: bind to store
  const [selectedMoviesCount, setSelectedMoviesCount] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
      className="space-y-2"
    >
      <Label className="text-xs font-medium text-muted flex items-center gap-1.5">
        <Layers className="size-3.5" />
        Collection size
      </Label>

      <Select value={selectedMoviesCount} onValueChange={setSelectedMoviesCount}>
        <SelectTrigger className="cursor-pointer w-full h-10 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={8}
          className="bg-graphite border-border/40 shadow-xl"
        >
          {DATA_MOVIES_COUNT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};
