import { getTranslations } from "next-intl/server";
import { IconHeart } from "@tabler/icons-react";
import { Button } from "@/shared/ui";
import { TelegramIcon } from "@/shared/icons";
import { cn } from "@/shared/lib/utils";
import {
  APP_VERSION,
  FILM_FRAME_COLORS,
  SUPPORT_ANCHOR,
  TELEGRAM_URL,
} from "../model/about-config";
import { FilmPerforation } from "./FilmPerforation";

const VIEWFINDER_CORNERS = [
  "left-0 top-0 border-l-2 border-t-2 rounded-tl-2xl",
  "right-0 top-0 border-r-2 border-t-2 rounded-tr-2xl",
  "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
  "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
];

const RIBBON_FRAMES = [...FILM_FRAME_COLORS, ...FILM_FRAME_COLORS];

export const AboutHero = async () => {
  const t = await getTranslations("about");

  return (
    <header className="relative isolate flex flex-col gap-16 sm:gap-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[44rem]"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 0%, color-mix(in oklab, var(--accent) 32%, transparent), transparent 72%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="relative px-6 py-14 sm:px-14 sm:py-20">
          {VIEWFINDER_CORNERS.map((position) => (
            <span
              key={position}
              aria-hidden
              className={cn(
                "pointer-events-none absolute size-8 border-accent/70 sm:size-12",
                position,
              )}
            />
          ))}

          <div className="flex flex-col items-start gap-7">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-light">
              <span
                aria-hidden
                className="size-2 rounded-full bg-destructive shadow-[0_0_10px_var(--destructive)] motion-safe:animate-pulse"
              />
              {t("version", { version: APP_VERSION })}
            </span>

            <h1 className="font-unbounded text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {t("title")}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-zinc-light sm:text-xl">
              {t("lead")}
            </p>

            <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button
                asChild
                variant="accent"
                className="h-12 gap-2.5 rounded-xl px-6 text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <TelegramIcon className="size-6" aria-hidden="true" />
                  <span className="text-base font-semibold">{t("community.button")}</span>
                </a>
              </Button>

              <Button
                asChild
                className="group h-12 gap-2.5 rounded-xl border border-border bg-surface px-6 text-foreground transition-colors hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <a href={`#${SUPPORT_ANCHOR}`}>
                  <IconHeart
                    className="size-5 text-accent transition-transform motion-safe:group-hover:scale-110"
                    stroke={1.75}
                  />
                  <span className="text-base font-semibold">{t("support.title")}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="relative left-1/2 w-[130vw] -translate-x-1/2 -rotate-2">
        <div className="flex flex-col gap-2.5 border-y border-border bg-obsidian py-2.5 shadow-2xl shadow-black/60">
          <FilmPerforation />

          <div className="flex gap-2.5 px-2.5">
            {RIBBON_FRAMES.map((color, index) => (
              <div
                key={index}
                className="aspect-3/2 w-36 shrink-0 rounded-md border border-white/5 sm:w-48"
                style={{
                  background: `radial-gradient(120% 90% at 30% 20%, ${color}66, transparent 60%), var(--surface-subtle)`,
                }}
              />
            ))}
          </div>

          <FilmPerforation />
        </div>
      </div>
    </header>
  );
};
