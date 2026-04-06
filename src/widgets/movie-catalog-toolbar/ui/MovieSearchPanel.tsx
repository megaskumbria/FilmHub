"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/shared/ui";

export const MovieSearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="relative mb-4">
      <motion.div
        className="absolute inset-0 rounded-lg bg-linear-to-r from-accent/15 to-accent/5 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSearchFocused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      <div className="relative flex items-center">
        <Search
          className="absolute left-3 size-4 text-muted transition-colors pointer-events-none"
          style={{ color: isSearchFocused ? "hsl(var(--accent))" : undefined }}
        />

        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search movies, series..."
          variant="neutral"
          className="h-10 pl-9 pr-9 text-sm"
        />

        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setSearchQuery("")}
              className="cursor-pointer absolute right-3 size-5 rounded-full bg-muted/20 hover:bg-accent/20 flex items-center justify-center transition-colors group"
            >
              <X className="size-3.5 text-muted group-hover:text-accent transition-colors" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
