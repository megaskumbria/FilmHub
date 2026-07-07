"use client";

import { useCreationFlagStore } from "@/features/creation-flag";
import { Separator, Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { FlagBadge } from "@/entities";
import { PencilLine, Trash2, GripVertical, Loader2 } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useDeleteFlag, type FlagItem } from "@/shared/hooks";
import { type MouseEvent } from "react";
import { useShallow } from "zustand/shallow";

interface Props {
  flagItem: FlagItem;
  category: { name: string; id: string };
  isActive: boolean;
  index: number;
}

export const FlagListItem = ({ flagItem, category, isActive, index }: Props) => {
  const { flagName, color, bgOpacity, id, svgContent, iconName, iconId, fontFamily } = flagItem;

  const { ref, isDragging } = useSortable({
    id,
    index,
    type: category.id,
    group: category.id,
    accept: [category.id],
  });

  const { addPresetColor, updateStateFlag, updateStateUi } = useCreationFlagStore(
    useShallow((state) => ({
      addPresetColor: state.addPresetColor,
      updateStateFlag: state.updateStateFlag,
      updateStateUi: state.updateStateUi,
    })),
  );

  const { mutate: deleteFlag, isPending: isDeleting } = useDeleteFlag();

  // Fix me
  const handleSelectFlag = (
    flagName: string,
    category: { name: string; id: string },
    iconName: string,
    color: string,
    bgOpacity: number,
    svgContent: string,
    iconId: string | null,
    fontFamily: string,
  ) => {
    updateStateUi({ isCreatingNew: false, editingFlagId: id });
    addPresetColor(color);
    updateStateFlag({
      flagName,
      selectedColor: color,
      bgOpacity,
      selectedFont: fontFamily,
      selectedIcon: { iconName, svgContent, iconId },
      category,
    });
  };

  const handleDeleteFlag = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteFlag({ flagId: id, categoryId: category.id });
  };

  return (
    <li ref={ref}>
      <div
        role="button"
        data-dragging={isDragging}
        data-active={isActive}
        onClick={() =>
          handleSelectFlag(
            flagName,
            category,
            iconName ?? "",
            color,
            bgOpacity,
            svgContent ?? "",
            iconId ?? null,
            fontFamily,
          )
        }
        className={cn(
          "data-[dragging=true]:bg-white/5 data-[active=true]:bg-white/6 group hover:bg-white/5 flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all select-none",
        )}
        style={isActive ? { boxShadow: `inset 0 0 0 1px ${color}40` } : undefined}
      >
        <FlagBadge flagItem={flagItem} />

        <div className="flex items-center gap-x-1 shrink-0">
          <div className="flex items-center gap-x-2">
            <div className="size-5 flex items-center justify-center">
              <PencilLine
                className={cn(
                  "size-4 transition-all duration-150",
                  isActive ? "opacity-70" : "opacity-0 group-hover:opacity-40",
                )}
                style={{ color: isActive ? color : undefined }}
              />
            </div>

            <Button
              onClick={(e) => handleDeleteFlag(e)}
              className="size-5 flex items-center justify-center group"
            >
              {isDeleting ?
                <Loader2 className="size-4 animate-spin text-zinc-muted" />
              : <Trash2 className="size-4 text-zinc-muted opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all duration-150 cursor-pointer" />
              }
            </Button>
          </div>

          <Separator
            orientation="vertical"
            className="h-3 bg-border/40 transition-all duration-150 opacity-0 group-hover:opacity-100"
          />

          <GripVertical className="cursor-grab size-4.5 text-zinc-muted opacity-0 group-hover:opacity-100 transition-all duration-150" />
        </div>
      </div>
    </li>
  );
};
