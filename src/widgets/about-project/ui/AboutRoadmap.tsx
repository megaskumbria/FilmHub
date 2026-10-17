import { getTranslations } from "next-intl/server";
import { IconHourglassLow } from "@tabler/icons-react";
import { ROADMAP_ITEMS } from "../model/about-config";

export const AboutRoadmap = async () => {
  const t = await getTranslations("about.roadmap");

  return (
    <section
      aria-labelledby="about-roadmap"
      className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-5 sm:px-8"
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2
          id="about-roadmap"
          className="font-unbounded text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {t("title")}
        </h2>
      </header>

      <div className="flex flex-col gap-10">
        <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden
            className="absolute bottom-0 left-5 top-0 border-l border-dashed border-slate-edge lg:bottom-auto lg:left-0 lg:right-0 lg:top-5 lg:border-l-0 lg:border-t"
          />

          {ROADMAP_ITEMS.map(({ key, icon: Icon }) => (
            <li key={key} className="group relative flex flex-col gap-4 pl-16 lg:pl-0 lg:pt-16">
              <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-border bg-surface text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="size-5" stroke={1.75} />
              </span>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-dashed border-gold/50 px-3 py-1 text-sm font-medium text-gold">
                <IconHourglassLow className="size-4" stroke={1.75} />
                {t("status")}
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-base leading-relaxed text-zinc-muted">
                  {t(`items.${key}.text`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
