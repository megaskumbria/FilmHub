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
  RadioGroup,
  RadioGroupItem,
} from "@/shared/ui";
import Link from "next/link";
import { HelpCircle, Plus, Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { type FlagItem, useGetFlags } from "@/shared/hooks";
import { FlagBadge } from "@/entities";

export const SetMovieFlags = () => {
  const [selectedFlags, setSelectedFlags] = useState<Record<string, FlagItem>>({});

  const { data: flagsData = [] } = useGetFlags();

  const handleSelectFlag = (category: string, value: string, flagItems: FlagItem[]) => {
    const flag = flagItems.find((flag) => flag.id.toString() === value);

    if (!flag) return;

    setSelectedFlags((prev) => ({
      ...prev,
      [category]: flag,
    }));
  };

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
          />
          {/* {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-muted hover:text-foreground transition-colors"
                >
                  <X className="size-3" />
                </button>
              )} */}
        </div>
      </nav>

      <div className="overflow-y-auto max-h-92 px-1.5 drawer-scroll">
        {flagsData.length === 0 ?
          <div className="py-6 text-center text-xs text-zinc-muted">No flags found</div>
        : <Accordion type="multiple">
            {flagsData.map(({ category, flagItems }) => {
              return (
                <AccordionItem
                  key={category}
                  value={category}
                  className="border-b border-border last:border-0"
                >
                  <AccordionTrigger className="items-center px-2 py-2.5 text-sm font-medium text-foreground/70 hover:no-underline hover:bg-white/4 hover:text-foreground transition-all gap-2 data-[state=open]:text-foreground [&>svg]:text-zinc-muted/60 [&[data-state=open]>svg]:text-zinc-muted">
                    <span className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="truncate">{category}</span>

                      {selectedFlags[category] && (
                        <span className="ml-auto mr-1 shrink-0">
                          <FlagBadge flagItem={selectedFlags[category]} />
                        </span>
                      )}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-1">
                    <RadioGroup
                      className="gap-0"
                      value={selectedFlags[category]?.id.toString()}
                      onValueChange={(value) => handleSelectFlag(category, value, flagItems)}
                    >
                      {flagItems.map((flag) => {
                        const isChecked = selectedFlags[category]?.id === flag.id;

                        return (
                          <label
                            key={flag.id}
                            className={cn(
                              "flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all",
                              "hover:bg-white/4",
                              isChecked
                                && "bg-accent/8 shadow-[inset_0_0_0_1px_rgba(155,86,240,0.25)]",
                            )}
                          >
                            <FlagBadge flagItem={flag} />
                            <RadioGroupItem
                              value={flag.id.toString()}
                              className={cn(
                                "size-3.5 border shrink-0 transition-all",
                                isChecked ?
                                  "border-accent bg-accent/20 text-accent shadow-[0_0_6px_rgba(155,86,240,0.4)]"
                                : "border-border/50 text-accent",
                              )}
                            />
                          </label>
                        );
                      })}
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        }
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
