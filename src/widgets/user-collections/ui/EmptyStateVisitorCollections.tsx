"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "@/shared/hooks";

interface Props {
  userId: string;
}

const MiniFolder = () => (
  <div className="flex flex-col shrink-0" aria-hidden>
    <div className="ml-1 h-1.5 w-4 rounded-t-xs border-t border-l border-r border-border/50 bg-background" />
    <div className="h-5 w-8 rounded-b-md rounded-tr-md border border-border/50 bg-background" />
  </div>
);

export const EmptyStateVisitorCollections = ({ userId }: Props) => {
  const t = useTranslations("collections.emptyState");
  const { data: profile } = useQuery(profileQueryOptions({ userId }));
  const nickname = profile?.nickname;

  return (
    <section className="w-full flex flex-col items-center justify-center gap-8 h-80">
      <div className="relative w-full max-w-2xl flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="w-full flex items-center h-16 bg-surface border-y border-border/50 overflow-hidden">
          <div className="flex items-center gap-4 px-4 shrink-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <MiniFolder key={`left-${i}`} />
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-border/30" />

            <p className="text-sm text-muted/60 tracking-widest uppercase whitespace-nowrap select-none">
              {t("noneYet")}
            </p>

            <div className="h-px flex-1 bg-border/30" />
          </div>

          <div className="flex items-center gap-4 px-4 shrink-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <MiniFolder key={`right-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted text-center max-w-md">
        {nickname ? t("visitor", { name: nickname }) : t("visitorUnknown")}
      </p>
    </section>
  );
};
