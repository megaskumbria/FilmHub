"use client";

import { MovieSearchPanel } from "./MovieSearchPanel";
import { CategoryTabs } from "./CategoryTabs";
import { FilterPopover } from "./FilterPopover";

export const MovieCatalogToolbar = () => {
  return (
    <section className="relative mb-8 rounded-2xl bg-graphite border border-border/40 p-5 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-accent/8 blur-3xl rounded-full pointer-events-none" />

      <MovieSearchPanel />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <CategoryTabs />

        <FilterPopover />
      </div>
    </section>
  );
};
