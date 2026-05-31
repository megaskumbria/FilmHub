import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

export const EmptyStateCollectionFilms = () => {
  const locale = useLocale();

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 h-80">
      <div className="relative w-full max-w-2xl flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#121214] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#121214] to-transparent z-10 pointer-events-none" />

        <div className="w-full flex items-center h-14 bg-surface border-y border-border/50 overflow-hidden">
          <div className="flex items-center gap-2 px-3 shrink-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-3 h-5 rounded-sm bg-background border border-border/40" />
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-border/30" />

            <p className="text-sm text-muted/60 tracking-widest uppercase whitespace-nowrap select-none">
              no films added
            </p>

            <div className="h-px flex-1 bg-border/30" />
          </div>

          <div className="flex items-center gap-2 px-3 shrink-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-3 h-5 rounded-sm bg-background border border-border/40" />
            ))}
          </div>
        </div>
      </div>

      <Link
        href={`/${locale}/movie-search`}
        className="group flex items-center gap-2 text-sm text-muted/50 hover:text-muted transition-colors duration-200"
      >
        <span className="underline underline-offset-4 decoration-muted/20 group-hover:decoration-muted/50 transition-colors duration-200">
          Browse the catalogue to find something to add
        </span>
        <ArrowRight className="size-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform duration-200" />
      </Link>
    </div>
  );
};
