import { POPULAR_FLAGS } from "../model/popular-flags-data";
import { FlagBadge } from "@/entities/flag-badge/ui/FlagBadge";

export const PopularFlagsCarousel = () => {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <span className="text-sm font-semibold text-foreground tracking-wide">
          Популярные флаги
        </span>
        <span className="text-xs text-zinc-muted ml-1">— для вдохновения</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 drawer-scroll">
        {POPULAR_FLAGS.map((flag) => (
          <button
            key={flag.id}
            className="shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-border/40 bg-surface-subtle hover:bg-white/4 hover:border-accent/30 transition-all cursor-pointer group"
          >
            <FlagBadge flagItem={flag} />
            <span className="text-[10px] text-zinc-muted/50 group-hover:text-zinc-muted transition-colors">
              +{Math.floor(Math.random() * 200 + 50)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
