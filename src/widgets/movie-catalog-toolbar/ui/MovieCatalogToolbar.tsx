"use client";

import { MovieSearchPanel } from "./MovieSearchPanel";
import { CategoryTabs } from "./CategoryTabs";
import { FilterPopover } from "./FilterPopover";
import { GenreRail } from "./GenreRail";
import { ActiveFilters } from "./ActiveFilters";

export const MovieCatalogToolbar = () => {
  return (
    <section aria-labelledby="catalog-title" className="relative mb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-10 h-48 w-136 max-w-full rounded-full bg-accent/10 blur-3xl"
      />

      <header className="relative mb-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pt-4">
        <CategoryTabs />

        <div className="flex w-full items-center gap-2 lg:w-auto lg:pb-3">
          <MovieSearchPanel />
          <FilterPopover />
        </div>
      </header>

      <GenreRail />
      <ActiveFilters />
    </section>
  );
};
