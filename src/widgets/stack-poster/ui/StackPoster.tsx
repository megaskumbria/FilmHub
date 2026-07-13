import { cn } from "@/shared/lib/utils";
import { MovieCardData } from "@/shared/model/movies";
import Image from "next/image";
import { IconStarFilled, IconStack2 } from "@tabler/icons-react";

const CARD_W = 220;
const CARD_H = Math.round(CARD_W * (3 / 2));

interface Props {
  movie: MovieCardData;
  isTop: boolean;
  filmsCount: number;
  rating: number;
  hovered: boolean;
}

export const StackPoster = ({ movie, isTop, filmsCount, rating, hovered }: Props) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border",
        isTop ?
          "border-white/15 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)]"
        : "border-white/8 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.65)]",
      )}
      style={{ height: CARD_H }}
    >
      <Image
        src={movie.imgUrl}
        alt={movie.title}
        width={CARD_W}
        height={CARD_H}
        className={cn(
          "w-full h-full object-cover transition-[transform,filter] duration-500",
          !isTop && "brightness-[0.6] saturate-[0.9]",
        )}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_55%,rgba(0,0,0,0.45)_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"
      />

      {!isTop && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/22 via-transparent to-accent/8 mix-blend-overlay"
        />
      )}

      {isTop && (
        <>
          <div className="pointer-events-none absolute -left-8 -top-8 size-28 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 ring-1 ring-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            <IconStarFilled className="size-3 text-gold" />

            <span className="text-xs font-semibold leading-none text-foreground">
              {rating.toFixed(1)}
            </span>
          </div>

          <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 ring-1 ring-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            <IconStack2 className="size-3 text-accent" />
            <span className="text-xs font-semibold leading-none text-foreground">{filmsCount}</span>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300",
              hovered ? "opacity-100" : "opacity-0",
            )}
          />
        </>
      )}
    </div>
  );
};
