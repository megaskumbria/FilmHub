"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
  RadioGroupItem,
  RadioGroup,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Input,
} from "@/shared/ui";
import { PopoverMode } from "@/widgets/movie-card/ui/MovieCard";
import { flagsData } from "@/shared/model/flags";
import { FlagBadge } from "@/entities/flag-badge/ui/FlagBadge";
import { Check, HelpCircle, Plus, Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { IFlagItem } from "@/shared/model/flags";
import Link from "next/link";
import { folders } from "@/widgets/user-collections/model/mock-folders";
import Image from "next/image";

interface AddFlagPopoverProps {
  mode: PopoverMode;
}

export const AddFlagPopover = ({ mode }: AddFlagPopoverProps) => {
  const [selectedFlags, setSelectedFlags] = useState<Record<string, IFlagItem>>({});
  const [selectedFolders, setSelectedFolders] = useState<Set<number>>(new Set());
  const [folderSearch, setFolderSearch] = useState("");

  const toggleFolder = (id: number) => {
    setSelectedFolders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(folderSearch.toLowerCase()),
  );

  const handleSelectFlag = (category: string, value: string, flagItems: IFlagItem[]) => {
    const flag = flagItems.find((flag) => flag.id.toString() === value);

    if (!flag) return;

    setSelectedFlags((prev) => ({
      ...prev,
      [category]: flag,
    }));
  };

  return (
    <>
      {mode === "add-flag" && (
        <div className="flex flex-col w-96">
          <header className="flex items-center justify-between px-3.5 py-3 border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
            <div className="flex items-center gap-2.5">
              <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
              <span className="text-sm font-semibold text-foreground tracking-wide">Флаги</span>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="size-4 text-zinc-muted hover:text-foreground transition-colors cursor-pointer" />
              </TooltipTrigger>

              <TooltipContent>
                <p>Максимум 1 флаг из категории</p>
              </TooltipContent>
            </Tooltip>
          </header>

          <nav className="p-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-muted pointer-events-none" />
              <Input
                variant="neutral"
                placeholder="Поиск категории..."
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
              <div className="py-6 text-center text-xs text-zinc-muted">Флаги не найдены</div>
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
                <span>Создать флаг</span>
              </Button>
            </Link>
          </footer>
        </div>
      )}
      {mode === "add-collection" && (
        <div className="flex flex-col w-80">
          <header className="flex items-center justify-between px-3.5 py-3 border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
            <div className="flex items-center gap-2.5">
              <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
              <span className="text-sm font-semibold text-foreground tracking-wide">Коллекции</span>
            </div>

            {selectedFolders.size > 0 && (
              <span className="text-xs text-accent font-medium">
                {selectedFolders.size} выбрано
              </span>
            )}
          </header>

          <nav className="p-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-muted pointer-events-none" />
              <Input
                variant="neutral"
                placeholder="Поиск коллекции..."
                className="pl-7 pr-2 text-sm h-9"
                value={folderSearch}
                onChange={(e) => setFolderSearch(e.target.value)}
              />
            </div>
          </nav>

          <div className="overflow-y-auto max-h-72 px-1.5 pb-1.5 drawer-scroll flex flex-col gap-0.5">
            {filteredFolders.length === 0 ?
              <div className="py-6 text-center text-xs text-zinc-muted">Коллекции не найдены</div>
            : filteredFolders.map((folder) => {
                const { id, name, borderBase, count, posters } = folder;
                const isSelected = selectedFolders.has(id);

                return (
                  <button
                    key={id}
                    onClick={() => toggleFolder(id)}
                    className={cn(
                      "flex items-center gap-3 px-2 py-2 rounded-xl transition-all cursor-pointer w-full text-left",
                      "hover:bg-white/4",
                      isSelected && "bg-accent/8 shadow-[inset_0_0_0_1px_rgba(155,86,240,0.25)]",
                    )}
                  >
                    <div
                      className={cn(
                        "relative size-10 shrink-0 rounded-lg overflow-hidden border",
                        borderBase,
                      )}
                    >
                      {posters[0] && (
                        <Image
                          src={posters[0]}
                          alt={name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{name}</p>
                      <p className="text-xs text-zinc-muted">{count} фильмов</p>
                    </div>

                    <div
                      className={cn(
                        "size-4.5 rounded-md border shrink-0 flex items-center justify-center transition-all",
                        isSelected ?
                          "border-accent bg-accent text-white shadow-[0_0_6px_rgba(155,86,240,0.4)]"
                        : "border-border/50",
                      )}
                    >
                      {isSelected && <Check className="size-3" />}
                    </div>
                  </button>
                );
              })
            }
          </div>

          <footer className="px-2 py-2 border-t border-border/40 bg-linear-to-r from-accent/3 via-transparent to-transparent flex items-center gap-1.5">
            <Button
              disabled={selectedFolders.size === 0}
              className="flex-1 h-8 px-2 text-sm rounded-lg bg-accent/10 hover:bg-accent/20 text-accent hover:text-accent border border-accent/20 transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>Добавить</span>
            </Button>

            <Link href="/my-collections" className="shrink-0">
              <Button className="h-8 px-2.5 text-zinc-muted hover:text-accent hover:bg-accent/10 transition-all rounded-lg gap-1.5">
                <Plus className="size-3 shrink-0" />
                <span className="text-sm">Новая</span>
              </Button>
            </Link>
          </footer>
        </div>
      )}
    </>
  );
};
