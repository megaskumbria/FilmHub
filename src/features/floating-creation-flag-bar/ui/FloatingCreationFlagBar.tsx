"use client";

import { cn } from "@/shared/lib/utils";
import { Button, Separator } from "@/shared/ui";
import { Save, X } from "lucide-react";
import { useCreateFlag, useEditFlag } from "@/shared/hooks";
import { type FlagDraft, useCreationFlagStore } from "@/features/creation-flag";
import { useState, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useTranslations } from "next-intl";

export const FloatingCreationFlagBar = () => {
  const t = useTranslations("flags.bar");
  const [currentEditFlag, setCurrentEditFlag] = useState<FlagDraft | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const { mutate: createFlag, isPending: isCreating } = useCreateFlag();
  const { mutate: editFlag, isPending: isUpdating } = useEditFlag();

  const { flag, ui, cancelCreationFlag, lastSnapshotFlag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
      ui: state.ui,
      cancelCreationFlag: state.cancelCreationFlag,
      lastSnapshotFlag: state.lastSnapshotFlag,
    })),
  );

  const { flagName, selectedColor, selectedFont, selectedIcon, scale, bgOpacity } = flag;
  const { isCreatingNew, editingFlagId } = ui;

  const isVisible = isCreatingNew || editingFlagId !== null;
  const isPending = isCreating || isUpdating;

  const displayFlagName = isVisible ? flagName : (lastSnapshotFlag?.flag.flagName ?? "");
  const displaySelectedColor = isVisible ? selectedColor : lastSnapshotFlag?.flag.selectedColor;
  const displaySelectedFont = isVisible ? selectedFont : lastSnapshotFlag?.flag.selectedFont;

  const hasEnoughData =
    displayFlagName.length > 0 && Boolean(displaySelectedColor) && Boolean(displaySelectedFont);

  const displayName = isVisible ? flagName : lastSnapshotFlag?.flag.flagName;

  const displayIsCreatingNew = isVisible ? isCreatingNew : lastSnapshotFlag?.ui.isCreatingNew;

  const handleSaveFlag = () => {
    if (!scale.id) return;

    const payload = {
      flagName,
      color: selectedColor,
      bgOpacity,
      fontFamily: selectedFont,
      scaleId: scale.id,
    };

    if (editingFlagId) {
      editFlag(
        { flagId: editingFlagId, ...payload, iconId: selectedIcon?.iconId },
        { onSuccess: () => cancelCreationFlag() },
      );
    } else {
      createFlag({ ...payload, icon: selectedIcon }, { onSuccess: () => cancelCreationFlag() });
    }
  };

  useEffect(() => {
    setHasChanges(false);
    setCurrentEditFlag({
      flagName,
      selectedColor,
      bgOpacity,
      selectedFont,
      selectedIcon,
      scale,
    });
  }, [editingFlagId, isCreatingNew]);

  useEffect(() => {
    if (!currentEditFlag) return;

    const changed =
      flagName !== currentEditFlag.flagName
      || selectedColor !== currentEditFlag.selectedColor
      || bgOpacity !== currentEditFlag.bgOpacity
      || selectedFont !== currentEditFlag.selectedFont
      || selectedIcon?.iconId !== currentEditFlag.selectedIcon?.iconId
      || scale.id !== currentEditFlag.scale.id;

    setHasChanges(changed);
  }, [flagName, selectedColor, bgOpacity, selectedFont, selectedIcon, scale, currentEditFlag]);

  const shouldDisabled = hasEnoughData && hasChanges;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-surface shadow-[0_8px_32px_-4px_rgba(0,0,0,0.8),0_0_0_1px_rgba(155,86,240,0.12)]">
        <div className="text-sm text-zinc-muted">
          <span>{displayIsCreatingNew ? t("new") : t("editing")} </span>

          <span
            className={cn(
              "font-medium transition-colors",
              displayName ? "text-foreground" : "text-zinc-muted italic",
            )}
          >
            {displayName || t("untitled")}
          </span>
        </div>

        <Separator orientation="vertical" className="h-4" />

        <Button
          onClick={handleSaveFlag}
          disabled={isPending}
          variant={shouldDisabled ? "accent" : "outline"}
          size="default"
          className={cn(
            "h-8 px-4 rounded-lg gap-1.5 text-sm select-none active:scale-95 duration-200 transition-transform",
            !shouldDisabled && "opacity-50 pointer-events-none",
          )}
        >
          <Save className="size-3.5 shrink-0" />
          <span>{!isCreatingNew ? t("saveChanges") : t("save")}</span>
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
