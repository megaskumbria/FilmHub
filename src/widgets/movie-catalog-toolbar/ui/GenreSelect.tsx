"use client";

import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { DATA_GENRE } from "../model/genres";

interface GenreSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const GenreSelect = ({ value, onValueChange }: GenreSelectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-2"
    >
      <Label className="text-xs font-medium text-muted flex items-center gap-1.5">
        <Film className="size-3.5" />
        Genre
      </Label>

      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="cursor-pointer w-full h-10 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
          <SelectValue placeholder="Select genre" />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={8}
          className="bg-graphite border-border/40 shadow-xl"
        >
          {DATA_GENRE.map((genre) => (
            <SelectItem key={genre.value} value={genre.value}>
              {genre.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};
