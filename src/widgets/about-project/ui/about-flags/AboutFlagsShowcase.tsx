import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FlagBadge } from "@/entities";
import { cn } from "@/shared/lib/utils";
import { EXAMPLE_FLAGS, FLAG_SHOWCASE } from "../../model/about-config";

const FLAG_COLORS = Object.fromEntries(EXAMPLE_FLAGS.map(({ key, color }) => [key, color]));

const SHOWCASE_LAYOUT = [
  { filmClass: "-rotate-2", flagsClass: "items-start -ml-3" },
  { filmClass: "mt-12 rotate-2 sm:mt-16", flagsClass: "items-end -mr-3" },
];

export const AboutFlagsShowcase = async () => {
  const t = await getTranslations("about.flags");

  return (
    <figure aria-hidden className="flex items-start justify-center gap-5 sm:gap-8">
      {FLAG_SHOWCASE.map(({ poster, flags }, index) => {
        const layout = SHOWCASE_LAYOUT[index];

        return (
          <div key={poster} className={cn("relative shrink-0", layout.filmClass)}>
            <div className="relative aspect-2/3 w-36 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/70 sm:w-52">
              <Image src={poster} alt="" fill sizes="208px" className="object-cover select-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
            </div>

            <ul
              className={cn("absolute inset-x-0 bottom-4 flex flex-col gap-2.5", layout.flagsClass)}
            >
              {flags.map((key) => (
                <li key={key} className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]">
                  <FlagBadge
                    flagItem={{
                      flagName: t(`examples.${key}`),
                      color: FLAG_COLORS[key],
                      bgOpacity: 0.2,
                      fontFamily: "Manrope",
                      icon: null,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </figure>
  );
};
