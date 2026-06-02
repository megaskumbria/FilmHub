"use client";

import { Button, Input } from "@/shared/ui";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  CalendarArrowDown,
  CalendarArrowUp,
  Plus,
  Search,
} from "lucide-react";
import { FlagCategoryAccordion } from "./FlagCategoryAccordion";
import { memo } from "react";

export const FlagCategoriesSidebar = memo(() => {
  return (
    <aside className="sticky top-18 w-80 shrink-0 rounded-xl border border-border/60 bg-surface-subtle flex flex-col overflow-hidden">
      <div className="px-4 py-3.5 border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />

          <span className="text-sm font-semibold text-foreground tracking-wide">
            Flag categories
          </span>
        </div>

        <div className="flex gap-2">
          <Input variant="neutral" placeholder="Category name..." className="text-sm h-8 flex-1" />
          <Button variant="accent" size="sm" className="shrink-0 rounded-lg text-xs font-medium">
            <Plus className="size-3.5" />
            <span>Create</span>
          </Button>
        </div>
      </div>

      <nav className="px-3 py-2.5 flex flex-col gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-muted pointer-events-none" />
          <Input
            variant="neutral"
            placeholder="Search categories and flags..."
            className="pl-7 pr-2 text-sm h-8"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-zinc-muted/90 font-semibold uppercase tracking-widest shrink-0">
            Sort
          </span>

          <div className="flex-1 h-px bg-border/30" />

          <div className="flex items-center gap-1">
            <Button
              variant="transparent"
              size="icon-xs"
              className="h-6 w-6 justify-center rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-foreground hover:border-border/70 hover:bg-white/6 transition-colors"
              title="Alphabetical (A → Z)"
            >
              <ArrowDownAZ className="size-3.5" />
            </Button>

            <Button
              variant="transparent"
              size="icon-xs"
              className="h-6 w-6 justify-center rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-foreground hover:border-border/70 hover:bg-white/6 transition-colors"
              title="Alphabetical (Z → A)"
            >
              <ArrowUpAZ className="size-3.5" />
            </Button>

            <span className="w-px h-3.5 bg-border/40 mx-0.5 shrink-0" />

            <Button
              variant="transparent"
              size="icon-xs"
              className="h-6 w-6 justify-center rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-foreground hover:border-border/70 hover:bg-white/6 transition-colors"
              title="Newest first"
            >
              <CalendarArrowDown className="size-3.5" />
            </Button>

            <Button
              variant="transparent"
              size="icon-xs"
              className="h-6 w-6 justify-center rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-foreground hover:border-border/70 hover:bg-white/6 transition-colors"
              title="Oldest first"
            >
              <CalendarArrowUp className="size-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="overflow-y-auto max-h-[540px] px-2 scrollbar-minimal">
        <FlagCategoryAccordion />
      </div>
    </aside>
  );
});
