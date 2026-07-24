"use client";

import { useState } from "react";
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { DATA_FEED_GENRES } from "../model/dataFeedGenres";

export const FeedGenreSelect = () => {
  const [selectedGenre, setSelectedGenre] = useState("");

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

      <Select value={selectedGenre} onValueChange={setSelectedGenre}>
        <SelectTrigger className="cursor-pointer w-full h-10 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
          <SelectValue placeholder="Select genre" />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={8}
          className="bg-graphite border-border/40 shadow-xl"
        >
          {DATA_FEED_GENRES.map((genre) => (
            <SelectItem key={genre.id} value={genre.id}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};
