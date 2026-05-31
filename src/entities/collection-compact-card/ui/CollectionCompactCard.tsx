import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { Check } from "lucide-react";
import { ICollection } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";

interface Props {
  collection: ICollection;
  isSelected: boolean;
  toggleCollection: (id: string) => void;
}

export const CollectionCompactCard = ({ collection, isSelected, toggleCollection }: Props) => {
  const { id, iconName, collectionName, colorHex, hasMedia, mediaCount } = collection;
  const Icon = ICONS.find((i) => i.iconName === iconName)?.icon;

  const borderColor =
    hasMedia ? `${colorHex}66`
    : isSelected ? `${colorHex}99`
    : `${colorHex}4D`;

  return (
    <div className="relative pt-2">
      <div
        className="absolute top-0 left-3 h-2 w-10 rounded-t-md border-t border-l border-r bg-surface transition-colors duration-300"
        style={{ borderColor }}
      />

      <Button
        key={id}
        onClick={() => toggleCollection(id)}
        className={cn(
          "relative flex items-stretch gap-0 w-full overflow-hidden rounded-b-xl rounded-tr-xl border transition-all duration-300 text-left",
          hasMedia ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        )}
        style={{
          borderColor,
          boxShadow: isSelected ? `0 4px 16px ${colorHex}55` : undefined,
        }}
        disabled={hasMedia}
      >
        <div className="relative h-16 w-20 shrink-0 bg-surface">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, color-mix(in srgb, ${colorHex} 30%, black) 0%, color-mix(in srgb, ${colorHex} 10%, black) 100%)`,
            }}
          />

          <div className="absolute bottom-2 left-2">
            <div className="size-5 rounded-md bg-black/50 flex items-center justify-center ring-1 ring-white/10">
              {Icon && <Icon className="size-3" style={{ color: colorHex }} />}
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between px-3 bg-surface">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{collectionName}</p>
            <p className="text-xs text-zinc-muted">
              {mediaCount} {mediaCount === 1 ? "film" : "films"}
            </p>
          </div>

          {hasMedia ?
            <span className="ml-2 shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-medium border border-zinc-muted/40 text-zinc-muted bg-white/5">
              Added
            </span>
          : <div
              className={cn(
                "size-4.5 rounded-md border shrink-0 flex items-center justify-center transition-all ml-2",
                isSelected ?
                  "border-accent bg-accent text-white shadow-[0_0_6px_rgba(155,86,240,0.4)]"
                : "border-zinc-muted/60 bg-white/5",
              )}
            >
              {isSelected && <Check className="size-3" />}
            </div>
          }
        </div>
      </Button>
    </div>
  );
};
