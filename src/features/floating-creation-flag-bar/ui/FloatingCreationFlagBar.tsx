"use client";

import { cn } from "@/shared/lib/utils";
import { Button, Separator } from "@/shared/ui";
import { Save, X } from "lucide-react";
import { useCreateFlag, useUpdateFlag } from "@/shared/hooks";
import { useCreationFlagStore } from "@/features/creation-flag";

export const FloatingCreationFlagBar = () => {
  const { mutate: createFlag, isPending: isCreating } = useCreateFlag();
  const { mutate: updateFlag, isPending: isUpdating } = useUpdateFlag();

  const {
    flagName,
    selectedColor,
    bgOpacity,
    selectedFont,
    selectedIcon,
    category,
    isCreatingNew,
    editingFlagId,
    cancelCreationFlag,
    lastSnapshotFlag,
  } = useCreationFlagStore();

  const isVisible = isCreatingNew || editingFlagId !== null;
  const isPending = isCreating || isUpdating;

  const displayFlagName = isVisible ? flagName : (lastSnapshotFlag?.flagName ?? "");
  const displaySelectedColor = isVisible ? selectedColor : lastSnapshotFlag?.selectedColor;
  const displaySelectedFont = isVisible ? selectedFont : lastSnapshotFlag?.selectedFont;

  const hasEnoughData =
    displayFlagName.length > 0 && Boolean(displaySelectedColor) && Boolean(displaySelectedFont);

  const displayName = isVisible ? flagName : lastSnapshotFlag?.flagName;

  const displayIsCreatingNew = isVisible ? isCreatingNew : lastSnapshotFlag?.isCreatingNew;

  const handleSaveFlag = () => {
    const payload = {
      flagName,
      color: selectedColor,
      bgOpacity,
      fontFamily: selectedFont,
      iconId: selectedIcon?.iconName ?? null,
      categoryId: category.id,
    };

    if (editingFlagId) {
      updateFlag({ id: editingFlagId, ...payload });
    } else {
      createFlag(payload, { onSuccess: () => cancelCreationFlag() });
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-surface shadow-[0_8px_32px_-4px_rgba(0,0,0,0.8),0_0_0_1px_rgba(155,86,240,0.12)]">
        <div className="text-sm text-zinc-muted">
          <span>{displayIsCreatingNew ? "New flag: " : "Editing: "}</span>

          <span
            className={cn(
              "font-medium transition-colors",
              displayName ? "text-foreground" : "text-zinc-muted italic",
            )}
          >
            {displayName || "Untitled"}
          </span>
        </div>

        <Separator orientation="vertical" className="h-4" />

        <Button
          onClick={handleSaveFlag}
          disabled={isPending}
          variant={hasEnoughData ? "accent" : "outline"}
          size="default"
          className={cn(
            "h-8 px-4 rounded-lg gap-1.5 text-sm select-none active:scale-95 duration-200 transition-transform",
            !hasEnoughData && "opacity-50 pointer-events-none",
          )}
        >
          <Save className="size-3.5 shrink-0" />
          <span>Save flag</span>
        </Button>

        <Separator orientation="vertical" className="h-4" />

        <Button
          onClick={cancelCreationFlag}
          variant="transparent"
          size="none"
          className="p-1 rounded-lg flex items-center justify-center text-zinc-muted hover:text-foreground hover:bg-white/5 transition-colors duration-150 shrink-0"
        >
          <X className="size-6 shrink-0" />
        </Button>
      </div>
    </div>
  );
};
