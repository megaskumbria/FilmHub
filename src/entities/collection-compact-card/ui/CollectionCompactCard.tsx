import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { Check } from "lucide-react";
import { ICollection } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";

interface Props {
  collection: ICollection;
  isSelected: boolean;
  toggleCollection: (id: string) => void;
}
export const CollectionCompactCard = ({ collection, isSelected, toggleCollection }: Props) => {
  const { id, iconName, collectionName, colorHex, posters } = collection;
  const Icon = ICONS.find((i) => i.iconName === iconName)?.icon;

  return (
    <div className="relative pt-2">
      <div
        className="absolute top-0 left-3 h-2 w-10 rounded-t-md border-t border-l border-r bg-surface transition-colors duration-300"
        style={{ borderColor: isSelected ? `${colorHex}99` : `${colorHex}4D` }}
      />

      <button
        key={id}
        onClick={() => toggleCollection(id)}
        className="relative flex items-stretch gap-0 w-full cursor-pointer overflow-hidden rounded-b-xl rounded-tr-xl border transition-all duration-300 text-left"
        style={{
          borderColor: isSelected ? `${colorHex}99` : `${colorHex}4D`,
          boxShadow: isSelected ? `0 4px 16px ${colorHex}55` : undefined,
        }}
      >
        <div className="relative h-16 w-20 shrink-0 bg-surface overflow-hidden">
          {posters[0] && (
            <Image src={posters[0]} alt="" fill className="object-cover" sizes="80px" />
          )}

          <div
            className="absolute inset-0 opacity-70"
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
            <p className="text-xs text-zinc-muted">N films</p>
          </div>

          <div
            className={cn(
              "size-4.5 rounded-md border shrink-0 flex items-center justify-center transition-all ml-2",
              isSelected ?
                "border-accent bg-accent text-white shadow-[0_0_6px_rgba(155,86,240,0.4)]"
              : "border-zinc-muted/60 bg-white/5",
            )}
          >
            {isSelected && <Check className="size-3" />}
          </div>
        </div>
      </button>
    </div>
  );
};
