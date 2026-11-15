import Image from "next/image";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { Collection } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";

const POSTER_FRAMES_COUNT = 3;
const FRAME_STEP_PX = 32;

const sprocketsStyle = (color: string): CSSProperties => ({
  backgroundImage: `linear-gradient(90deg, ${color} 0 4px, transparent 4px 8px)`,
  backgroundSize: "8px 3px",
  backgroundPosition: "2px center",
  backgroundRepeat: "repeat-x",
});

interface Props {
  collection: Collection;
  isSelected: boolean;
  toggleCollection: (id: string) => void;
}

export const CollectionCompactCard = ({ collection, isSelected, toggleCollection }: Props) => {
  const t = useTranslations("movie.collections");
  const { id, iconName, collectionName, colorHex, hasMedia, moviesCount, posters } = collection;
  const Icon = ICONS.find((i) => i.iconName === iconName)?.icon;

  const posterFrames = Array.from({ length: POSTER_FRAMES_COUNT }, (_, i) => posters[i]);
  const sprocketColor = isSelected ? `${colorHex}CC` : "rgb(255 255 255 / 0.14)";

  return (
    <Button
      variant="tile"
      disabled={hasMedia}
      onClick={() => toggleCollection(id)}
      className="items-stretch"
      style={
        isSelected ?
          {
            borderColor: `${colorHex}B3`,
            backgroundColor: `color-mix(in srgb, ${colorHex} 10%, transparent)`,
          }
        : undefined
      }
    >
      <div
        className={cn(
          "relative w-25 shrink-0 overflow-hidden bg-obsidian",
          hasMedia && "grayscale",
        )}
      >
        <div
          className="flex w-max flex-col gap-0.5 py-0.5 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(${isSelected ? -FRAME_STEP_PX : 0}px)` }}
        >
          <span className="h-1" style={sprocketsStyle(sprocketColor)} />

          <div className="flex gap-0.5 px-0.5">
            {posterFrames.map((src, i) => (
              <div
                key={i}
                className="relative h-11 w-7.5 shrink-0 overflow-hidden rounded-[3px] bg-white/5"
              >
                {src && <Image src={src} alt="" fill className="object-cover" sizes="30px" />}
              </div>
            ))}

            <div
              className="flex h-11 w-7.5 shrink-0 items-center justify-center rounded-[3px]"
              style={{ backgroundColor: `color-mix(in srgb, ${colorHex} 35%, black)` }}
            >
              {Icon && <Icon className="size-3.5 text-white" />}
            </div>
          </div>

          <span className="h-1" style={sprocketsStyle(sprocketColor)} />
        </div>

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to right, ${colorHex}26, ${colorHex}0D 70%, transparent)`,
            opacity: isSelected ? 0 : 1,
          }}
        />
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{collectionName}</p>

          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-muted">
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: colorHex }}
            />
            {t("films", { count: moviesCount })}
          </p>
        </div>

        {hasMedia ?
          <span className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-zinc-muted">
            <IconCheck className="size-3.5" stroke={2.25} />
            {t("added")}
          </span>
        : <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
              isSelected ? "border-transparent text-white" : "border-white/15 text-zinc-muted",
            )}
            style={isSelected ? { backgroundColor: colorHex } : undefined}
          >
            {isSelected ?
              <IconCheck className="size-3.5" stroke={2.5} />
            : <IconPlus className="size-3.5" stroke={2} />}
          </span>
        }
      </div>
    </Button>
  );
};
