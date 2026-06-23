import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { IFlag } from "@/shared/hooks";
import { Label } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { FlagBadge } from "@/entities";
import { PencilLine, Trash2 } from "lucide-react";

interface Props {
  flagItem: IFlag;
  categoryName: string;
  isActive: boolean;
}

export const FlagListItem = ({ flagItem, categoryName, isActive }: Props) => {
  const { setCategoryName, setFlagName, addPresetColor, setBgOpacity } = useCreationFlagStore();

  const { flagName, color, bgOpacity } = flagItem;

  const handleSelectFlag = (
    flagName: string,
    categoryName: string,
    color: string,
    bgOpacity: number,
  ) => {
    addPresetColor(color);
    setFlagName(flagName, color);
    setCategoryName(categoryName);
    setBgOpacity(bgOpacity);
  };

  return (
    <li>
      <Label
        onClick={() => handleSelectFlag(flagName, categoryName, color, bgOpacity)}
        className={cn(
          "group hover:bg-white/5 flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all select-none",
          isActive && "bg-white/6",
        )}
        style={isActive ? { boxShadow: `inset 0 0 0 1px ${color}40` } : undefined}
      >
        <FlagBadge flagItem={flagItem} />

        <span className="flex items-center gap-1.5 shrink-0">
          <PencilLine
            className={cn(
              "size-3.5 transition-all duration-150",
              isActive ? "opacity-70" : "opacity-0 group-hover:opacity-40",
            )}
            style={{ color: isActive ? color : undefined }}
          />

          <span className="w-px h-3 bg-border/40 transition-all duration-150 opacity-0 group-hover:opacity-100" />

          <Trash2
            onClick={(e) => e.stopPropagation()}
            className="size-3.5 text-zinc-muted opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all duration-150 cursor-pointer"
          />
        </span>
      </Label>
    </li>
  );
};
