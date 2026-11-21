"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

interface Props {
  isMyProfile: boolean;
  searchQuery?: string;
}

const SPROCKETS = Array.from({ length: 6 }, (_, index) => index);

export const EmptyStateCollectionFilms = ({ isMyProfile, searchQuery = "" }: Props) => {
  const locale = useLocale();
  const t = useTranslations("collections.emptyFilms");

  const hasSearch = searchQuery.trim().length > 0;

  const title =
    hasSearch ? t("search.title")
    : isMyProfile ? t("empty.own.title")
    : t("empty.visitor.title");

  const text =
    hasSearch ? null
    : isMyProfile ? t("empty.own.text")
    : t("empty.visitor.text");

  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-6 sm:h-80 sm:gap-8">
      <div className="relative flex w-full max-w-2xl items-center">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-linear-to-r from-[#121214] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-8 bg-linear-to-l from-[#121214] to-transparent sm:w-24" />

        <div className="flex h-12 w-full items-center overflow-hidden border-y border-border/50 bg-surface sm:h-14">
          <div className="flex shrink-0 items-center gap-1.5 px-2 sm:gap-2 sm:px-3">
            {SPROCKETS.map((index) => (
              <div
                key={index}
                className={cn(
                  "h-4 w-2.5 rounded-sm border border-border/40 bg-background sm:h-5 sm:w-3",
                  index > 2 && "hidden sm:block",
                )}
              />
            ))}
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 sm:gap-3">
            <div className="h-px flex-1 bg-border/30" />

            <p className="shrink-0 text-xs tracking-wider text-muted/60 uppercase select-none sm:text-sm sm:tracking-widest">
              {title}
            </p>

            <div className="h-px flex-1 bg-border/30" />
          </div>

          <div className="flex shrink-0 items-center gap-1.5 px-2 sm:gap-2 sm:px-3">
            {SPROCKETS.map((index) => (
              <div
                key={index}
                className={cn(
                  "h-4 w-2.5 rounded-sm border border-border/40 bg-background sm:h-5 sm:w-3",
                  index > 2 && "hidden sm:block",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {text && (
        <Link
          href={`/${locale}/catalog`}
          className="group flex max-w-full items-center justify-center gap-2 px-4 text-center text-sm text-muted/50 transition-colors duration-200 hover:text-muted"
        >
          <span className="underline decoration-muted/20 underline-offset-4 transition-colors duration-200 group-hover:decoration-muted/50">
            {text}
          </span>
          <ArrowRight className="size-3.5 shrink-0 -translate-x-1 transition-transform duration-200 group-hover:translate-x-0" />
        </Link>
      )}
    </div>
  );
};
