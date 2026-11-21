"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface Props {
  query: string;
  onClear: () => void;
}

const BACK_CARDS = [
  { rotate: -8, x: -34, y: 14, z: 1 },
  { rotate: 7.5, x: 32, y: 10, z: 2 },
] as const;

export const EmptyStateCollectionsFeed = ({ query, onClear }: Props) => {
  const t = useTranslations("home.emptySearch");

  return (
    <section
      aria-live="polite"
      className="col-span-full flex w-full flex-col items-center px-2 pt-14 pb-6 sm:pt-20"
    >
      <div className="relative h-64 w-full max-w-sm sm:h-72" aria-hidden>
        <div className="absolute bottom-1 left-1/2 h-5 w-40 -translate-x-1/2 rounded-full bg-black blur-2xl" />

        {BACK_CARDS.map((card) => (
          <div
            key={card.rotate}
            className="absolute top-0 left-1/2 aspect-2/3 w-32 overflow-hidden rounded-xl border border-white/8 bg-[linear-gradient(165deg,#23232b_0%,#141418_100%)] shadow-[0_14px_28px_-16px_rgba(0,0,0,0.7)] sm:w-40"
            style={{
              zIndex: card.z,
              transform: `translateX(calc(-50% + ${card.x}px)) translateY(${card.y}px) rotate(${card.rotate}deg)`,
              transformOrigin: "center bottom",
            }}
          >
            <div className="absolute inset-2.5 rounded-lg border border-white/10" />
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
          </div>
        ))}

        <div
          className="absolute top-0 left-1/2 aspect-2/3 w-32 overflow-hidden rounded-xl border border-white/15 bg-[linear-gradient(165deg,#2c2640_0%,#191920_46%,#121214_100%)] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)] sm:w-40"
          style={{
            zIndex: 3,
            transform: "translateX(-50%)",
            transformOrigin: "center bottom",
          }}
        >
          <div className="absolute inset-2.5 rounded-lg border border-white/10" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_45%,rgba(0,0,0,0.45)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent" />
        </div>
      </div>

      <h2 className="mt-8 text-center font-serif text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        {t("title")}
      </h2>

      <p className="mt-2 max-w-md text-center text-sm leading-6 wrap-break-word text-zinc-muted sm:text-base">
        {t("text", { query })}
      </p>

      <Button
        type="button"
        variant="subtle"
        onClick={onClear}
        className={cn(
          "mt-6 h-9 rounded-full px-4 text-sm",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        )}
      >
        {t("clear")}
      </Button>
    </section>
  );
};
