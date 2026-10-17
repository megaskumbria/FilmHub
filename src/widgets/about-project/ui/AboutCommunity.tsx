import { getTranslations } from "next-intl/server";
import { Button } from "@/shared/ui";
import { TelegramIcon } from "@/shared/icons";
import { cn } from "@/shared/lib/utils";
import { TELEGRAM_URL } from "../model/about-config";

const INCOMING_BUBBLES = ["w-40 sm:w-52", "w-28 sm:w-36"];

export const AboutCommunity = async () => {
  const t = await getTranslations("about.community");

  return (
    <section aria-labelledby="about-community" className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="relative isolate grid grid-cols-1 items-center gap-12 overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-12 lg:grid-cols-[1.15fr_1fr]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-accent/20 blur-3xl"
        />

        <div className="flex flex-col items-start gap-6">
          <TelegramIcon className="size-14" aria-hidden="true" />

          <h2
            id="about-community"
            className="font-unbounded text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {t("title")}
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-zinc-light sm:text-lg">
            {t("text")}
          </p>

          <Button
            asChild
            variant="accent"
            className="h-12 w-full gap-2.5 rounded-xl px-6 text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:w-auto"
          >
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              <TelegramIcon className="size-6" aria-hidden="true" />
              <span className="text-base font-semibold">{t("button")}</span>
            </a>
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {INCOMING_BUBBLES.map((width) => (
            <div key={width} aria-hidden className="flex items-end gap-2.5">
              <span className="size-8 shrink-0 rounded-full bg-slate-edge" />
              <span
                className={cn(
                  "flex h-11 flex-col justify-center gap-1.5 rounded-2xl rounded-bl-md bg-surface-elevated px-4",
                  width,
                )}
              >
                <span className="h-1.5 w-4/5 rounded-full bg-zinc-muted/50" />
                <span className="h-1.5 w-1/2 rounded-full bg-zinc-muted/30" />
              </span>
            </div>
          ))}

          <p className="ml-auto mt-2 max-w-sm rounded-3xl rounded-br-md bg-linear-to-br from-accent to-accent/75 px-6 py-5 text-lg font-semibold leading-snug text-accent-foreground shadow-xl shadow-accent/25">
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
};
