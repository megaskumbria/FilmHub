"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Button, Input } from "@/shared/ui";
import { useFilterMedia } from "@/features";
import { useDebounce } from "@/shared/hooks";
import { useTranslations } from "next-intl";

export const MovieSearchPanel = () => {
  const t = useTranslations("catalog");

  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const { setSearchQuery } = useFilterMedia();

  const debouncedSearch = useDebounce(input, 300);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch]);

  const handleClear = () => {
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <search className="group/search relative w-full transition-[width] duration-500 ease-out lg:w-80 lg:focus-within:w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-muted transition-colors pointer-events-none group-focus-within/search:text-accent" />

      <Input
        ref={inputRef}
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && e.currentTarget.blur()}
        placeholder={t("search")}
        variant="search"
      />

      <AnimatePresence initial={false} mode="wait">
        {input && (
          <motion.div
            key="clear"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Button
              type="button"
              onClick={handleClear}
              className="group size-6 rounded-full bg-muted/15 hover:bg-accent/20 transition-colors"
            >
              <X className="size-3.5 text-muted group-hover:text-accent transition-colors" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </search>
  );
};
