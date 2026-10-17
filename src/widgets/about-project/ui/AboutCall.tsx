import { getTranslations } from "next-intl/server";
import { EXAMPLE_FLAGS } from "../model/about-config";

export const AboutCall = async () => {
  const t = await getTranslations("about");

  return (
    <section
      aria-labelledby="about-call"
      className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-5 text-center sm:px-8"
    >
      <h2
        id="about-call"
        className="font-unbounded text-2xl font-semibold leading-[1.3] tracking-tight text-zinc-light sm:text-4xl lg:text-[2.75rem]"
      >
        {t.rich("call", {
          accent: (chunks) => (
            <span className="bg-linear-to-r from-destructive via-gold to-emerald-accent bg-clip-text font-bold text-transparent">
              {chunks}
            </span>
          ),
        })}
      </h2>

      <ul aria-hidden className="flex items-center gap-3">
        {EXAMPLE_FLAGS.map(({ key, color }) => (
          <li
            key={key}
            className="h-1.5 w-12 rounded-full sm:w-16"
            style={{ backgroundColor: color, boxShadow: `0 0 16px ${color}80` }}
          />
        ))}
      </ul>
    </section>
  );
};
