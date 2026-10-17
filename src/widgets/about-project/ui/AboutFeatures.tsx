import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";

const DECK_POSTERS = [
  {
    src: "/images/avengers-poster.webp",
    className: "scale-92 group-hover:-translate-x-32 group-hover:-rotate-8 group-hover:scale-88",
    imageClassName: "brightness-[0.75]",
  },
  {
    src: "/images/dune-poster.webp",
    className: "scale-92 group-hover:translate-x-32 group-hover:rotate-8 group-hover:scale-88",
    imageClassName: "brightness-[0.75]",
  },
  {
    src: "/images/resident-evil-poster.webp",
    className: "z-10 scale-92 group-hover:scale-100",
    imageClassName: "",
  },
];

const CARD_TOGGLES = [true, false, true];

export const AboutFeatures = async () => {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 sm:px-8 lg:flex-row">
      <section className="group relative flex min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-card p-4 transition-colors duration-300 hover:border-accent/40 sm:p-5">
        <div className="relative flex h-96 items-center justify-center">
          {DECK_POSTERS.map(({ src, className, imageClassName }) => (
            <div
              key={src}
              className={cn(
                "absolute aspect-2/3 w-52 overflow-hidden rounded-xl border border-white/15 shadow-xl shadow-black/50 motion-safe:transition-transform motion-safe:duration-350 motion-safe:ease-out sm:w-60",
                className,
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="240px"
                className={cn("object-cover", imageClassName)}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 px-1 pb-1">
          <h2
            id="about-collections"
            className="font-unbounded text-base font-semibold leading-snug text-foreground sm:text-lg"
          >
            {t("collections.title")}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-muted sm:text-base">
            {t("collections.text")}
          </p>
        </div>
      </section>

      <section className="group relative flex min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-card p-4 transition-colors duration-300 hover:border-accent/40 sm:p-5">
        <div aria-hidden className="flex h-96 items-center justify-center gap-4">
          <div className="flex aspect-2/3 w-52 scale-92 flex-col gap-3 rounded-xl border border-border bg-surface-elevated p-3 shadow-xl shadow-black/40 sm:w-60">
            <div
              className="min-h-0 flex-1 rounded-lg"
              style={{
                background:
                  "linear-gradient(150deg, color-mix(in oklab, var(--emerald-accent) 55%, transparent), var(--surface-subtle) 85%)",
              }}
            />
            <span className="h-2.5 w-3/4 rounded-full bg-zinc-light/70" />
            <div className="flex gap-2">
              <span className="h-2.5 w-10 rounded-full bg-accent/60" />
              <span className="h-2.5 w-8 rounded-full bg-gold/60" />
            </div>
          </div>

          <ul className="flex flex-col gap-4">
            {CARD_TOGGLES.map((enabled, index) => (
              <li key={index} className="flex items-center gap-3">
                <span
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors duration-300",
                    enabled ? "bg-emerald-accent" : "bg-slate-edge",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 size-5 rounded-full bg-foreground transition-all duration-300",
                      enabled ? "left-5.5" : "left-0.5",
                    )}
                  />
                </span>
                <span className="h-2.5 w-8 rounded-full bg-zinc-muted/50 sm:w-12" />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 px-1 pb-1">
          <h2
            id="about-cards"
            className="font-unbounded text-base font-semibold leading-snug text-foreground sm:text-lg"
          >
            {t("cards.title")}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-muted sm:text-base">{t("cards.text")}</p>
        </div>
      </section>
    </div>
  );
};
