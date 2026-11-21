"use client";

import { Search, ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { Input, Button, Separator, SearchClearButton } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { SortBy } from "@/widgets/flag-scales-sidebar";

interface Props {
  onSearchChange: (searchQuery: string) => void;
  searchQuery: string;
  onSortChange: (sortBy: SortBy) => void;
  sortBy: SortBy;
}

export const FlagScalesFilter = ({ onSearchChange, searchQuery, onSortChange, sortBy }: Props) => {
  const t = useTranslations("flags.scales");

  return (
    <>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-muted pointer-events-none" />

        <Input
          variant="neutral"
          placeholder={t("search")}
          className="pl-7 pr-9 text-sm h-8"
          onChange={(e) => onSearchChange(e.target.value)}
          value={searchQuery}
        />

        <SearchClearButton show={!!searchQuery} onClear={() => onSearchChange("")} size={5} />
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs text-zinc-muted/90 font-semibold uppercase tracking-widest shrink-0">
          {t("sort")}
        </span>

        <Separator className="flex-1 bg-border/30" />

        <div className="flex items-center gap-1">
          <Button
            data-active={sortBy === "asc"}
            variant="transparent"
            size="icon-xs"
            className="data-[active=true]:text-foreground data-[active=true]:border-border/70 data-[active=true]:bg-white/6 h-6 w-6 justify-center rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-foreground hover:border-border/70 hover:bg-white/6 transition-colors"
            title={t("sortAsc")}
            onClick={() => onSortChange(sortBy === "asc" ? "default" : "asc")}
          >
            <ArrowDownAZ className="size-3.5" />
          </Button>

          <Button
            data-active={sortBy === "desc"}
            variant="transparent"
            size="icon-xs"
            className="data-[active=true]:text-foreground data-[active=true]:border-border/70 data-[active=true]:bg-white/6 h-6 w-6 justify-center rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-foreground hover:border-border/70 hover:bg-white/6 transition-colors"
            title={t("sortDesc")}
            onClick={() => onSortChange(sortBy === "desc" ? "default" : "desc")}
          >
            <ArrowUpAZ className="size-3.5" />
          </Button>
        </div>
      </div>
    </>
  );
};
