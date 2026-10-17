import Image from "next/image";
import { getTranslations } from "next-intl/server";

const DEMO_TOGGLES = [
  { key: "title", delay: 0.4 },
  { key: "description", delay: 1.2 },
  { key: "genres", delay: 2.0 },
] as const;

const DEMO_GENRES = ["drama", "crime"] as const;

const DEMO_REVEAL_CLASS =
  "grid grid-rows-[0fr] opacity-0 animate-[card-settings-reveal_10s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:grid-rows-[1fr] motion-reduce:opacity-100";

export const AboutCardDemo = async () => {
  const t = await getTranslations("about.cards");
  const tCard = await getTranslations("settings.card");

  return (
    <section className="group relative flex min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-card p-4 transition-colors duration-300 hover:border-accent/40 sm:p-5">
      <div aria-hidden className="flex h-96 items-center justify-center gap-3 sm:gap-4">
        <div className="relative aspect-2/3 w-40 scale-92 overflow-hidden rounded-xl border border-border shadow-xl shadow-black/40 sm:w-60">
          <Image
            src="/images/breaking-bad-poster.jpg"
            alt=""
            fill
            sizes="240px"
            className="object-cover"
          />

          <div
            className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black from-30% via-black/90 via-55% to-transparent opacity-0 animate-[card-settings-scrim_10s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: `${DEMO_TOGGLES[0].delay}s` }}
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-col p-3">
            <div
              className={DEMO_REVEAL_CLASS}
              style={{ animationDelay: `${DEMO_TOGGLES[0].delay + 0.1}s` }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex items-baseline justify-between gap-2 pt-1.5">
                  <h3 className="truncate text-base font-semibold text-foreground">
                    {t("demo.title")}
                  </h3>
                  <span className="text-sm font-medium text-muted">2008</span>
                </div>
              </div>
            </div>

            <div
              className={DEMO_REVEAL_CLASS}
              style={{ animationDelay: `${DEMO_TOGGLES[1].delay + 0.1}s` }}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="line-clamp-3 pt-1.5 text-xs leading-snug text-zinc-light">
                  {t("demo.description")}
                </p>
              </div>
            </div>

            <div
              className={DEMO_REVEAL_CLASS}
              style={{ animationDelay: `${DEMO_TOGGLES[2].delay + 0.1}s` }}
            >
              <div className="min-h-0 overflow-hidden">
                <ul className="flex gap-1 pt-1.5">
                  {DEMO_GENRES.map((genre) => (
                    <li
                      key={genre}
                      className="inline-flex items-center whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-1.5 text-xs font-medium leading-none tracking-wide text-muted"
                    >
                      {t(`demo.genres.${genre}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-4">
          {DEMO_TOGGLES.map(({ key, delay }) => (
            <li key={key} className="flex items-center gap-3">
              <span
                className="relative h-6 w-11 shrink-0 rounded-full bg-slate-edge animate-[card-settings-track_10s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:bg-emerald-accent"
                style={{ animationDelay: `${delay}s` }}
              >
                <span
                  className="absolute left-0.5 top-0.5 size-5 rounded-full bg-foreground animate-[card-settings-thumb_10s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:translate-x-5"
                  style={{ animationDelay: `${delay}s` }}
                />
              </span>
              <span className="text-sm text-zinc-muted">{tCard(key)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 px-1 pb-1">
        <h2
          id="about-cards"
          className="font-unbounded text-base font-semibold leading-snug text-foreground sm:text-lg"
        >
          {t("title")}
        </h2>
        <p className="text-sm leading-relaxed text-zinc-muted sm:text-base">{t("text")}</p>
      </div>
    </section>
  );
};
