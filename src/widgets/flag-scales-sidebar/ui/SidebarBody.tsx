"use client";

import { CreateFlagScale, FlagScalesFilter } from "@/features";
import { SortBy } from "../model/types";
import { FlagScaleAccordion } from "./FlagScaleAccordion";

interface Props {
  searchQuery: string;
  debouncedSearch: string;
  sortBy: SortBy;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortBy) => void;
}

export const SidebarBody = ({
  searchQuery,
  debouncedSearch,
  sortBy,
  onSearchChange,
  onSortChange,
}: Props) => (
  <>
    <CreateFlagScale />

    <nav className="flex shrink-0 flex-col gap-2 px-3 py-2.5">
      <FlagScalesFilter
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
        onSortChange={onSortChange}
        sortBy={sortBy}
      />
    </nav>

    <div className="min-h-0 flex-1 overflow-y-auto scrollbar-minimal">
      <FlagScaleAccordion searchQuery={debouncedSearch} sortBy={sortBy} />
    </div>
  </>
);
