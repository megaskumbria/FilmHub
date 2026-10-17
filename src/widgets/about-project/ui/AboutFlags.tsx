import { getTranslations } from "next-intl/server";
import { IconMovie } from "@tabler/icons-react";
import { FlagBadge } from "@/entities";
import { DotGrid } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { EXAMPLE_FLAGS, FLAG_STEPS } from "../model/about-config";
import { FilmPerforation } from "./FilmPerforation";

const FLAG_PLACEMENTS = [
  "-rotate-3 translate-x-1 sm:translate-x-2",
  "rotate-2 translate-x-3 sm:translate-x-12",
  "-rotate-1 translate-x-0",
  "rotate-3 translate-x-2 sm:translate-x-9",
];

export const AboutFlags = async () => {
  const t = await getTranslations("about.flags");

  return (
    <section
      aria-labelledby="about-flags"
      className="relative isolate overflow-hidden border-y border-border bg-obsidian"
    >
      <FilmPerforation className="absolute inset-x-0 top-3" />
      <FilmPerforation className="absolute inset-x-0 bottom-3" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 55% at 78% 50%, color-mix(in oklab, var(--accent) 26%, transparent), transparent 70%), radial-gradient(35% 45% at 10% 15%, color-mix(in oklab, var(--destructive) 10%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-32">
        <div className="flex flex-col gap-12">
          <header className="flex flex-col gap-6">
            <h2
              id="about-flags"
              className="font-unbounded text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {t.rich("title", {
                accent: (chunks) => (
                  <span className="bg-linear-to-r from-accent to-gold bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
          </header>

          <ol className="relative flex flex-col gap-8 border-l border-border pl-8 sm:pl-10">
            {FLAG_STEPS.map((step, index) => (
              <li key={step} className="relative flex flex-col gap-2">
                <span
                  aria-hidden
                  className="absolute -left-8 top-1 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border border-accent/60 bg-obsidian font-unbounded text-sm font-semibold text-accent sm:-left-10"
                >
                  {index + 1}
                </span>

                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  {t(`steps.${step}`)}
                </h3>
                <p
                  className={cn(
                    "text-base leading-relaxed sm:text-lg",
                    index === 0 ? "text-foreground" : "text-zinc-light",
                  )}
                >
                  {t(step)}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="flex flex-col items-center gap-8">
          <div className="relative flex items-center">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/4 top-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/35 blur-3xl"
            />

            <div
              aria-hidden
              className="relative aspect-2/3 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/70 sm:w-64"
              style={{
                background:
                  "linear-gradient(165deg, color-mix(in oklab, var(--accent) 60%, var(--surface-subtle)) 0%, var(--charcoal) 55%, var(--surface-subtle) 100%)",
              }}
            >
              <DotGrid />
              <IconMovie
                className="absolute left-1/2 top-[38%] size-12 -translate-x-1/2 -translate-y-1/2 text-white/20 sm:size-16"
                stroke={1.25}
              />

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4 pt-16 sm:p-5 sm:pt-20">
                <span className="font-unbounded text-sm font-semibold text-foreground sm:text-lg">
                  {t("poster")}
                </span>
                <span className="flex gap-1.5">
                  <span className="h-1.5 w-10 rounded-full bg-white/40" />
                  <span className="h-1.5 w-6 rounded-full bg-white/25" />
                </span>
              </div>
            </div>

            <ul className="relative z-10 -ml-12 flex origin-left flex-col items-start gap-3.5 sm:-ml-20 sm:scale-125 sm:gap-4">
              {EXAMPLE_FLAGS.map(({ key, color }, index) => (
                <li
                  key={key}
                  className={cn("drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]", FLAG_PLACEMENTS[index])}
                >
                  <FlagBadge
                    flagItem={{
                      flagName: t(`examples.${key}`),
                      color,
                      bgOpacity: 0.2,
                      fontFamily: "Manrope",
                      icon: null,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </figure>
      </div>
    </section>
  );
};
