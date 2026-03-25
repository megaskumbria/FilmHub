"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
  Input,
} from "@/shared/ui";
import { flagsData } from "@/shared/model/flags/mockFlags";
import { FlagBadge } from "@/widgets/movie-card/ui/FlagBadge";
import { Plus, Search } from "lucide-react";

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

      <div className="overflow-y-auto flex-1 max-h-[540px] px-2 scrollbar-minimal">
        {flagsData.length === 0 ?
          <div className="py-8 text-center text-xs text-zinc-muted">Ничего не найдено</div>
        : <Accordion type="multiple">
            {flagsData.map(({ category, flagItems }) => (
              <AccordionItem
                key={category}
                value={category}
                className="border-b border-border/40 last:border-0"
              >
                <AccordionTrigger className="items-center px-2 py-2 text-sm font-medium text-foreground/70 hover:no-underline hover:bg-white/4 hover:text-foreground transition-all gap-2 data-[state=open]:text-foreground [&>svg]:text-zinc-muted/60 [&[data-state=open]>svg]:text-zinc-muted">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="truncate">{category}</span>
                    <span className="ml-auto flex items-center gap-1.5 shrink-0">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium tabular-nums text-zinc-muted bg-white/6 border border-border/30">
                        {flagItems.length}
                      </span>

                      <Button
                        asChild
                        size="icon-xs"
                        variant="transparent"
                        className="flex items-center justify-center shrink-0 rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        title="Добавить флаг"
                      >
                        <Plus className="size-3" />
                      </Button>
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-1">
                  <ul className="flex flex-col gap-0.5">
                    {flagItems.map((flag) => (
                      <li
                        key={`${category}-${flag.id}`}
                        className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg hover:bg-white/4 transition-colors cursor-pointer"
                      >
                        <FlagBadge flagItem={flag} />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        }
      </div>
    </aside>
  );
};
