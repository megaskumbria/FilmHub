import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { FLAG_STEPS } from "../../model/about-config";

export const AboutFlagsIntro = async () => {
  const t = await getTranslations("about.flags");

  return (
    <div className="flex min-w-0 flex-col gap-12">
      <header className="flex flex-col gap-6">
        <h2
          id="about-flags"
          className="font-unbounded text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.125rem] xl:text-[2.375rem]"
        >
          <span className="bg-linear-to-r from-accent to-gold bg-clip-text text-transparent">
            {t("title")}
          </span>
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
  );
};
