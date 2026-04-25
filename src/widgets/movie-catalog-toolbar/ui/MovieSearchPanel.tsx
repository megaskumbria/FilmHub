"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/shared/ui";
import { useMediaCatalog } from "@/shared/stores/movie-catalog";
import { useDebounce } from "@/shared/hooks";

export const MovieSearchPanel = () => {
  const [input, setInput] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { setSearchQuery } = useMediaCatalog();

  const debouncedSearch = useDebounce(input, 500);

  useEffect(() => {
    setSearchQuery(debouncedSearch); // React query can cache and don't make new request
  }, [debouncedSearch]);

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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search movies, series..."
          variant="neutral"
          className="h-10 pl-9 pr-9 text-sm"
        />

        <AnimatePresence>
          {input && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setInput("")}
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
