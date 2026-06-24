"use client";

import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { IFlag } from "@/shared/hooks";
import { Label, Separator } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { FlagBadge } from "@/entities";
import { PencilLine, Trash2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";

interface Props {
  flagItem: IFlag;
  categoryName: string;
  isActive: boolean;
  index: number;
}

export const FlagListItem = ({ flagItem, categoryName, isActive, index }: Props) => {
  const { flagName, color, bgOpacity, id } = flagItem;

  const { ref, isDragging } = useSortable({
    id,
    index,
    type: categoryName,
    accept: [categoryName],
  });

  const { setCategoryName, setFlagName, addPresetColor, setBgOpacity } = useCreationFlagStore();

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
    <li ref={ref}>
      <Label
        data-dragging={isDragging}
        data-active={isActive}
        onClick={() => handleSelectFlag(flagName, categoryName, color, bgOpacity)}
        className={cn(
          "data-[dragging=true]:bg-white/5 data-[active=true]:bg-white/6 group hover:bg-white/5 flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all select-none",
        )}
        style={isActive ? { boxShadow: `inset 0 0 0 1px ${color}40` } : undefined}
      >
        <FlagBadge flagItem={flagItem} />

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-x-2">
            <PencilLine
              className={cn(
                "size-3.5 transition-all duration-150",
                isActive ? "opacity-70" : "opacity-0 group-hover:opacity-40",
              )}
              style={{ color: isActive ? color : undefined }}
            />

            <Trash2
              onClick={(e) => e.stopPropagation()}
              className="size-3.5 text-zinc-muted opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all duration-150 cursor-pointer"
            />
          </div>

          <Separator
            orientation="vertical"
            className="h-3 bg-border/40 transition-all duration-150 opacity-0 group-hover:opacity-100"
          />

          <GripVertical className="cursor-grab size-5 text-zinc-muted opacity-0 group-hover:opacity-100 transition-all duration-150" />
        </div>
      </Label>
    </li>
  );
};
