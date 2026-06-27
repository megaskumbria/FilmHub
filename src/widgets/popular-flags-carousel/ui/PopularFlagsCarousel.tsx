"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { PRESET_PACKS } from "../model/preset-packs-data";
import { FlagBadge } from "@/entities/flag-badge/ui/FlagBadge";
import { PresetPackModal } from "./PresetPackModal";
import { Crown, Users } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}K`;
  return String(n);
}

export const PopularFlagsCarousel = () => {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <span className="text-sm font-semibold text-foreground tracking-wide">Popular packs</span>
        <span className="text-xs text-zinc-muted ml-1">— ready-made flag categories</span>

        <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border border-gold/30 bg-gold/8 text-gold">
          <Crown className="size-3" />
          <span>PRO</span>
        </span>
      </div>

      <Swiper
        modules={[FreeMode]}
        freeMode
        slidesPerView="auto"
        spaceBetween={12}
        className="overflow-visible! [&_.swiper-wrapper]:items-stretch"
      >
        {PRESET_PACKS.map((pack) => {
          const accentRgb = pack.accentColor.replace("rgba(", "").split(",").slice(0, 3).join(", ");

          return (
            <SwiperSlide key={pack.id} className="w-auto! h-auto!">
              <PresetPackModal pack={pack}>
                <Button
                  className={cn(
                    "group relative flex flex-col justify-between gap-3 w-56 h-full p-4 rounded-2xl border",
                    "border-border/40 bg-surface-subtle",
                    "hover:border-opacity-60 transition-all duration-200",
                    "hover:shadow-lg",
                  )}
                  style={
                    {
                      "--hover-border": `rgba(${accentRgb}, 0.5)`,
                      "--hover-glow": `rgba(${accentRgb}, 0.08)`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `rgba(${accentRgb}, 0.45)`;
                    el.style.backgroundColor = `rgba(${accentRgb}, 0.05)`;
                    el.style.boxShadow = `0 8px 32px -4px rgba(${accentRgb}, 0.2), 0 0 0 1px rgba(${accentRgb}, 0.08)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "";
                    el.style.backgroundColor = "";
                    el.style.boxShadow = "";
                  }}
                >
                  {/* Glow top-right */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: pack.accentColor }}
                  />

                  {/* Header */}
                  <div className="relative flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground leading-tight truncate">
                        {pack.title}
                      </p>
                      <p className="text-xs text-zinc-muted mt-0.5 line-clamp-3 leading-relaxed">
                        {pack.description}
                      </p>
                    </div>

                    <span
                      className="shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded-lg border"
                      style={{
                        color: pack.accentColor,
                        borderColor: `rgba(${accentRgb}, 0.3)`,
                        backgroundColor: `rgba(${accentRgb}, 0.1)`,
                      }}
                    >
                      {pack.flags.length}
                    </span>
                  </div>

                  {/* Flags preview */}
                  <div className="relative flex flex-wrap gap-1.5">
                    {pack.flags.slice(0, 3).map((flag) => (
                      <FlagBadge key={flag.id} flagItem={flag} />
                    ))}
                    {pack.flags.length > 3 && (
                      <span className="inline-flex items-center text-xs text-zinc-muted px-1.5 py-0.5 rounded-md border border-border/30 bg-white/3">
                        +{pack.flags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="relative flex w-full items-center justify-between pt-2 border-t border-border/30">
                    <span className="flex items-center gap-1 text-xs text-zinc-muted">
                      <Users className="size-3" />
                      <span>{formatCount(pack.usageCount)}</span>
                    </span>

                    <span
                      className="text-xs font-medium transition-colors"
                      style={{ color: pack.accentColor }}
                    >
                      Details →
                    </span>
                  </div>
                </Button>
              </PresetPackModal>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
