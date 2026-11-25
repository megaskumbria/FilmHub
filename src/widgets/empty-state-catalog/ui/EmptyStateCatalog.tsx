"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useFilterMedia } from "@/features";

const FRAME_CORNERS = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

export const EmptyStateCatalog = () => {
  const t = useTranslations("catalog");
  const { selectedGenre, selectedYear, selectedCountry, searchQuery } = useFilterMedia();

  const query = searchQuery.trim();
  const hasSearch = query.length > 0;

  const hasFilters = Boolean(selectedGenre.id || selectedYear || selectedCountry.iso31661);

  const highlight = (chunks: ReactNode) => <span className="text-zinc-light">{chunks}</span>;

  const description =
    hasSearch && hasFilters ? t.rich("emptyState.both", { query, em: highlight })
    : hasSearch ? t.rich("emptyState.search", { query, em: highlight })
    : hasFilters ? t("emptyState.filters")
    : t("emptyState.plain");

  return (
    <section className="flex flex-col items-center px-4 pt-12 pb-10 sm:pt-16">
      <div
        aria-hidden
        className="mb-4 relative aspect-2/3 w-36 overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(180deg,#2a2a32_0%,#191920_46%,#121214_100%)] shadow-[0_16px_36px_-20px_rgba(0,0,0,0.8)] sm:w-40"
      >
        <div className="absolute inset-2.5 rounded-lg border border-white/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

        {FRAME_CORNERS.map((corner) => (
          <span key={corner} className={`absolute size-3.5 border-white/35 ${corner}`} />
        ))}
      </div>

      <h2 className="text-center font-unbounded text-xl font-semibold tracking-tight text-balance text-foreground sm:text-2xl">
        {t("emptyState.title")}
      </h2>

      <p className="mt-2 max-w-sm text-center text-sm leading-6 wrap-break-word text-zinc-muted">
        {description}
      </p>
    </section>
  );
};
