"use client";

import { Button, Input } from "@/shared/ui";
import { Plus, Search } from "lucide-react";
import { FlagCategoryAccordion } from "./FlagCategoryAccordion";

export const FlagCategoriesSidebar = () => {
  return (
    <aside className="sticky top-18 w-80 shrink-0 rounded-xl border border-border/60 bg-surface-subtle flex flex-col overflow-hidden">
      <div className="px-4 py-3.5 border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />

          <span className="text-sm font-semibold text-foreground tracking-wide">
            Категории флагов
          </span>
        </div>

        <div className="flex gap-2">
          <Input
            variant="neutral"
            placeholder="Название категории..."
            className="text-sm h-8 flex-1"
          />
          <Button variant="accent" size="sm" className="shrink-0 rounded-lg text-xs font-medium">
            <Plus className="size-3.5" />
            <span>Создать</span>
          </Button>
        </div>
      </div>

      <nav className="px-3 py-2.5">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-muted pointer-events-none" />
          <Input
            variant="neutral"
            placeholder="Поиск категорий и флагов..."
            className="pl-7 pr-2 text-sm h-8"
          />
        </div>
      </nav>

      <div className="overflow-y-auto max-h-[540px] px-2 scrollbar-minimal">
        <FlagCategoryAccordion />
      </div>
    </aside>
  );
};
