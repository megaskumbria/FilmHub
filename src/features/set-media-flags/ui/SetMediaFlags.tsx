"use client";

import { Button, Input, Tooltip, TooltipTrigger, TooltipContent, Accordion } from "@/shared/ui";
import Link from "next/link";
import { HelpCircle, Plus, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { type FlagItem, useDebounce, useGetFlags, useSetMediaFlags } from "@/shared/hooks";
import { FlagsLimitNotice, FlagCategoryItem } from "@/features/set-media-flags";

const MAX_LIMIT_PER_MEDIA = 4;

interface Props {
  mediaId: number;
  popoverOpen: boolean;
}

export const SetMediaFlags = ({ mediaId, popoverOpen }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<Record<string, FlagItem>>({});

  const initializedRef = useRef(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: flagsData = [] } = useGetFlags({
    searchQuery: debouncedSearch,
    sortBy: "default",
    mediaId,
  });

  const { mutate: setMediaFlags } = useSetMediaFlags();

  const handleSelectFlag = (
    categoryName: string,
    flag: FlagItem,
    mediaId: number,
    categoryId: string,
  ) => {
    setSelectedFlags((prev) => {
      if (prev[categoryName]?.id === flag.id) {
        const next = { ...prev };
        delete next[categoryName];
        return next;
      }

      return { ...prev, [categoryName]: flag };
    });

    setMediaFlags({ mediaId, flag, categoryId, categoryName });
  };

  useEffect(() => {
    if (!popoverOpen) {
      initializedRef.current = false;
      return;
    }

    if (initializedRef.current || flagsData.length === 0) return;

    const initialSelectedFlags = flagsData.reduce<Record<string, FlagItem>>(
      (acc, { categoryName, flags }) => {
        const usedFlag = flags.find((f) => f.isUsed);

        if (usedFlag) acc[categoryName] = usedFlag;

        return acc;
      },
      {},
    );

    setSelectedFlags(initialSelectedFlags);
    initializedRef.current = true;
  }, [popoverOpen, flagsData]);

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

      <div className="overflow-y-auto max-h-92 px-1.5 drawer-scroll relative">
        {flagsData.length === 0 ?
          <div className="py-6 text-center text-xs text-zinc-muted">No flags found</div>
        : <Accordion type="multiple">
            {flagsData.map(({ id, categoryName, flags }) => (
              <FlagCategoryItem
                key={id}
                flags={flags}
                categoryName={categoryName}
                handleSelectFlag={handleSelectFlag}
                selectedFlags={selectedFlags}
                isLimitFlags={isLimitFlags}
                mediaId={mediaId}
                categoryId={id}
              />
            ))}
          </Accordion>
        }

        {isLimitFlags && <FlagsLimitNotice />}
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
