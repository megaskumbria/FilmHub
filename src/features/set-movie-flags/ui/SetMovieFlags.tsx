"use client";

import {
  Button,
  Input,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/ui";
import Link from "next/link";
import { HelpCircle, Plus, Search, Flag } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { type FlagItem, useDebounce, useGetFlags } from "@/shared/hooks";
import { FlagBadge } from "@/entities";

const MAX_LIMIT_PER_MEDIA = 4;

export const SetMovieFlags = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<Record<string, FlagItem>>({});

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: flagsData = [] } = useGetFlags(debouncedSearch);

  const handleSelectFlag = (categoryName: string, flag: FlagItem) => {
    setSelectedFlags((prev) => {
      if (prev[categoryName]?.id === flag.id) {
        const next = { ...prev };
        delete next[categoryName];
        return next;
      }

      return { ...prev, [categoryName]: flag };
    });
  };

  const isLimitFlags = Object.values(selectedFlags).length >= MAX_LIMIT_PER_MEDIA;

  return (
    <div className="flex flex-col w-96">
      <header className="flex items-center justify-between px-3.5 py-3 border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
        <div className="flex items-center gap-2.5">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <span className="text-sm font-semibold text-foreground tracking-wide">Flags</span>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="size-4 text-zinc-muted hover:text-foreground transition-colors cursor-pointer" />
          </TooltipTrigger>

          <TooltipContent>
            <p>At most one flag per category</p>
          </TooltipContent>
        </Tooltip>
      </header>

      <nav className="p-2.5">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-muted pointer-events-none" />
          <Input
            variant="neutral"
            placeholder="Search categories..."
            className="pl-7 pr-2 text-sm h-9"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </nav>

      <div className="overflow-y-auto max-h-92 px-1.5 drawer-scroll">
        {flagsData.length === 0 ?
          <div className="py-6 text-center text-xs text-zinc-muted">No flags found</div>
        : <Accordion type="multiple">
            {flagsData.map(({ id, categoryName, flags }) => {
              const isCategorySelected = Boolean(selectedFlags[categoryName]);
              const isCategoryBlocked = isLimitFlags && !isCategorySelected;

              return (
                <AccordionItem
                  key={id}
                  value={categoryName}
                  className={cn(
                    "border-b border-border last:border-0 transition-opacity duration-300",
                    isCategoryBlocked && "opacity-40 pointer-events-none",
                  )}
                >
                  <AccordionTrigger className="h-12.5 items-center px-2 py-2.5 rounded-none text-sm font-medium text-foreground/70 hover:no-underline hover:bg-white/4 hover:text-foreground transition-all gap-2 data-[state=open]:text-foreground [&>svg]:text-zinc-muted/60 [&[data-state=open]>svg]:text-zinc-muted">
                    <span className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="truncate">{categoryName}</span>

                      {selectedFlags[categoryName] && (
                        <span className="ml-auto mr-1 shrink-0">
                          <FlagBadge flagItem={selectedFlags[categoryName]} />
                        </span>
                      )}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-1">
                    <div className="flex flex-col gap-0">
                      {flags.map((flag) => {
                        const isChecked = selectedFlags[categoryName]?.id === flag.id;

                        return (
                          <Button
                            onClick={() => handleSelectFlag(categoryName, flag)}
                            key={flag.id}
                            className={cn(
                              "flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all hover:bg-white/4",
                              isChecked
                                && "bg-accent/8 shadow-[inset_0_0_0_1px_rgba(155,86,240,0.25)]",
                            )}
                          >
                            <FlagBadge flagItem={flag} />
                            <span
                              className={cn(
                                "relative flex items-center justify-center size-3.5 rounded-full border shrink-0 transition-all",
                                isChecked ?
                                  "border-accent bg-accent/20 shadow-[0_0_6px_rgba(155,86,240,0.4)]"
                                : "border-border/50",
                              )}
                            >
                              {isChecked && <span className="size-2 rounded-full bg-accent" />}
                            </span>
                          </Button>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        }
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-400 ease-in-out",
          isLimitFlags ? "max-h-20 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-2 mb-2 flex items-center gap-2.5 rounded-lg border border-accent/20 bg-accent/6 px-3 py-2 shadow-[inset_0_0_12px_rgba(155,86,240,0.06)]">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-accent/15">
            <Flag className="size-3.5 text-accent" />
          </span>

          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-accent leading-tight">
              Limit reached ({MAX_LIMIT_PER_MEDIA}/{MAX_LIMIT_PER_MEDIA})
            </span>

            <span className="text-[11px] text-zinc-muted leading-tight mt-0.5">
              Remove a flag to pick another
            </span>
          </div>

          <div className="ml-auto flex gap-1 shrink-0">
            {Array.from({ length: MAX_LIMIT_PER_MEDIA }).map((_, i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-accent shadow-[0_0_4px_rgba(155,86,240,0.8)]"
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="px-2 py-2 border-t border-border/40 bg-linear-to-r from-accent/3 via-transparent to-transparent">
        <Link href="/creation-flag">
          <Button className="w-full h-8 text-zinc-muted hover:text-accent hover:bg-accent/10 transition-all px-2 gap-1.5 rounded-lg justify-start">
            <Plus className="size-3 shrink-0" />
            <span>Create flag</span>
          </Button>
        </Link>
      </footer>
    </div>
  );
};
