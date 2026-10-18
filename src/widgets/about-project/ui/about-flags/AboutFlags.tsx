import { AboutFlagsIntro } from "./AboutFlagsIntro";
import { AboutFlagsShowcase } from "./AboutFlagsShowcase";
import { FilmPerforation } from "@/shared/ui";

export const AboutFlags = () => {
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
        <AboutFlagsIntro />
        <AboutFlagsShowcase />
      </div>
    </section>
  );
};
