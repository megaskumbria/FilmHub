"use client";

import { FlagScaleAccordion } from "./FlagScaleAccordion";
import { memo } from "react";
import { CreateFlagScale, FlagScalesFilter } from "@/features";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks";
import { SortBy } from "../model/types";

export const FlagScalesSidebar = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("default");

  const debouncedSearch = useDebounce(searchQuery, 300);

  return (
    <aside className="sticky top-18 max-w-92 w-full h-fit shrink-0 rounded-xl border border-border/60 bg-surface-subtle flex flex-1 flex-col overflow-hidden">
      <CreateFlagScale />

      <nav className="px-3 py-2.5 flex flex-col gap-2">
        <FlagScalesFilter
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          onSortChange={setSortBy}
          sortBy={sortBy}
        />
      </nav>

      <div className="overflow-y-auto max-h-135 scrollbar-minimal">
        <FlagScaleAccordion searchQuery={debouncedSearch} sortBy={sortBy} />
      </div>
    </aside>
  );
});
