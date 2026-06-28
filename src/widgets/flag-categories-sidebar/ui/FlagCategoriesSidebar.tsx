"use client";

import { FlagCategoryAccordion } from "./FlagCategoryAccordion";
import { memo } from "react";
import { CreateFlagCategory, FlagCategoriesFilter } from "@/features";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks";
import { SortBy } from "../model/types";

export const FlagCategoriesSidebar = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("default");

  const debouncedSearch = useDebounce(searchQuery, 300);

  return (
    <aside className="sticky top-18 max-w-92 w-full h-fit shrink-0 rounded-xl border border-border/60 bg-surface-subtle flex flex-1 flex-col overflow-hidden">
      <CreateFlagCategory />

      <nav className="px-3 py-2.5 flex flex-col gap-2">
        <FlagCategoriesFilter
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          onSortChange={setSortBy}
          sortBy={sortBy}
        />
      </nav>

      <div className="overflow-y-auto max-h-[540px] scrollbar-minimal">
        <FlagCategoryAccordion searchQuery={debouncedSearch} sortBy={sortBy} />
      </div>
    </aside>
  );
});
