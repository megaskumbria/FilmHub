import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { StackPoster } from "@/widgets/stack-poster";

const DECK_POSTERS = [
  {
    src: "/images/resident-evil-poster.webp",
    isTop: true,
    className: "z-30 group-hover:-translate-y-2.5",
  },
  {
    src: "/images/dune-poster.webp",
    isTop: false,
    className:
      "z-20 -translate-x-1.5 -translate-y-1.5 -rotate-[1.5deg] group-hover:translate-x-[42px] group-hover:translate-y-2 group-hover:rotate-8",
  },
  {
    src: "/images/avengers-poster.webp",
    isTop: false,
    className:
      "z-10 translate-x-1.5 -translate-y-2.5 rotate-3 group-hover:-translate-x-9 group-hover:translate-y-3 group-hover:-rotate-8",
  },
];

export const AboutCollectionsDeck = async () => {
  const t = await getTranslations("about.collections");

  return (
    <section className="group relative flex min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-card p-4 transition-colors duration-300 hover:border-accent/40 sm:p-5 lg:flex-[1.45]">
      <div className="relative flex h-96 items-center justify-center">
        <div className="relative h-88.5 w-69">
          <div
            aria-hidden
            className="absolute bottom-1 left-1/2 h-4 w-43 -translate-x-1/2 rounded-full bg-black blur-2xl"
          />
          <div className="absolute top-2 left-1/2 w-55 -translate-x-1/2">
            {DECK_POSTERS.map(({ src, isTop, className }) => (
              <div
                key={src}
                className={cn(
                  "absolute top-0 left-0 w-55 origin-[50%_90%] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out",
                  className,
                )}
              >
                <StackPoster
                  poster={src}
                  isTop={isTop}
                  filmsCount={18}
                  rating={8.4}
                  hovered={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-1 pb-1">
        <h2
          id="about-collections"
          className="font-unbounded text-base font-semibold leading-snug text-foreground sm:text-lg"
        >
          {t("title")}
        </h2>
        <p className="text-sm leading-relaxed text-zinc-muted sm:text-base">{t("text")}</p>
      </div>
    </section>
  );
};
