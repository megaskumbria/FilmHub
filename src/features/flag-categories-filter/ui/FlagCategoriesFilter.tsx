"use client";

import { Search, ArrowDownAZ, ArrowUpAZ, X } from "lucide-react";
import { Input, Button, Separator } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { SortBy } from "@/widgets/flag-categories-sidebar";

interface Props {
  onSearchChange: (searchQuery: string) => void;
  searchQuery: string;
  onSortChange: (sortBy: SortBy) => void;
  sortBy: SortBy;
}

export const FlagCategoriesFilter = ({
  onSearchChange,
  searchQuery,
  onSortChange,
  sortBy,
}: Props) => {
  return (
    <>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-muted pointer-events-none" />

        <Input
          variant="neutral"
          placeholder="Search categories and flags..."
          className="pl-7 pr-9 text-sm h-8"
          onChange={(e) => onSearchChange(e.target.value)}
          value={searchQuery}
        />

        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => onSearchChange("")}
              className="cursor-pointer top-1/2 -translate-y-1/2 absolute right-3 size-5 rounded-full bg-muted/20 hover:bg-accent/20 flex items-center justify-center transition-colors group"
            >
              <X className="size-3.5 text-muted group-hover:text-accent transition-colors" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs text-zinc-muted/90 font-semibold uppercase tracking-widest shrink-0">
          Sort
        </span>

        <Separator className="flex-1 bg-border/30" />

        <div className="flex items-center gap-1">
          <Button
            data-active={sortBy === "asc"}
            variant="transparent"
            size="icon-xs"
            className="data-[active=true]:text-foreground data-[active=true]:border-border/70 data-[active=true]:bg-white/6 h-6 w-6 justify-center rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-foreground hover:border-border/70 hover:bg-white/6 transition-colors"
            title="Alphabetical (A → Z)"
            onClick={() => onSortChange(sortBy === "asc" ? "default" : "asc")}
          >
            <ArrowDownAZ className="size-3.5" />
          </Button>

          <Button
            data-active={sortBy === "desc"}
            variant="transparent"
            size="icon-xs"
            className="data-[active=true]:text-foreground data-[active=true]:border-border/70 data-[active=true]:bg-white/6 h-6 w-6 justify-center rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-foreground hover:border-border/70 hover:bg-white/6 transition-colors"
            title="Alphabetical (Z → A)"
            onClick={() => onSortChange(sortBy === "desc" ? "default" : "desc")}
          >
            <ArrowUpAZ className="size-3.5" />
          </Button>
        </div>
      </div>
    </>
  );
};
