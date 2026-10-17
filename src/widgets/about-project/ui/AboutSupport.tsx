import { getTranslations } from "next-intl/server";
import { IconHeartFilled } from "@tabler/icons-react";
import { SupportOptions } from "@/features";
import { cn } from "@/shared/lib/utils";
import { SUPPORT_ANCHOR } from "../model/about-config";

const TICKET_NOTCH =
  "absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background";

export const AboutSupport = async () => {
  const t = await getTranslations("about.support");

  return (
    <section
      id={SUPPORT_ANCHOR}
      aria-labelledby="about-support"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 sm:px-8"
    >
      <div className="relative grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-[minmax(0,1fr)_auto_minmax(0,26rem)]">
        <header className="relative isolate flex flex-col justify-center gap-6 overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-accent/20 via-accent/5 to-transparent"
          />
          <IconHeartFilled
            aria-hidden
            className="pointer-events-none absolute -bottom-20 hidden md:block -right-16 -z-10 size-64 -rotate-12 text-accent/10"
          />

          <span className="flex size-14 items-center justify-center rounded-2xl bg-accent shadow-lg shadow-accent/40">
            <IconHeartFilled className="size-7 text-accent-foreground" />
          </span>

          <h2
            id="about-support"
            className="font-unbounded text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {t("title")}
          </h2>

          <p className="max-w-md text-base leading-relaxed text-zinc-light sm:text-lg">
            {t("text")}
          </p>
        </header>

        <div aria-hidden className="relative h-px md:h-auto md:w-px">
          <span className="absolute inset-x-8 top-0 border-t-2 border-dashed border-slate-edge md:inset-x-auto md:inset-y-8 md:left-0 md:border-l-2 md:border-t-0" />
          <span className={cn(TICKET_NOTCH, "left-0 top-1/2 md:left-1/2 md:top-0")} />
          <span className={cn(TICKET_NOTCH, "left-full top-1/2 md:left-1/2 md:top-full")} />
        </div>

        <div className="p-6 sm:p-10">
          <SupportOptions />
        </div>
      </div>
    </section>
  );
};
