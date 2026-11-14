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

  const displayFlagName = isVisible ? flagName : lastSnapshotFlag?.flag.flagName;
  const displaySelectedColor = isVisible ? selectedColor : lastSnapshotFlag?.flag.selectedColor;
  const displaySelectedFont = isVisible ? selectedFont : lastSnapshotFlag?.flag.selectedFont;

  const hasEnoughData =
    displayFlagName
    && displayFlagName.length > 0
    && Boolean(displaySelectedColor)
    && Boolean(displaySelectedFont);

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
        "fixed bottom-6 left-1/2 z-50 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <div className="flex w-max max-w-full flex-col items-center gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.8),0_0_0_1px_rgba(155,86,240,0.12)] sm:flex-row sm:gap-3 sm:px-5">
        <p className="max-w-full text-center text-sm leading-snug text-zinc-muted sm:text-left">
          <span>{displayIsCreatingNew ? t("new") : t("editing")} </span>
          <span
            className={cn(
              "font-medium wrap-break-word transition-colors",
              displayName ? "text-foreground" : "text-zinc-muted italic",
            )}
          >
            {displayName || t("untitled")}
          </span>
        </p>

        <Separator orientation="vertical" className="hidden h-4 sm:block" />

        <div className="flex items-center gap-3">
          <Button
            onClick={handleSaveFlag}
            disabled={isPending}
            variant={shouldDisabled ? "accent" : "outline"}
            size="default"
            className={cn(
              "h-8 shrink-0 gap-1.5 rounded-lg px-4 text-sm whitespace-nowrap select-none transition-transform duration-200 active:scale-95",
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
            className="flex shrink-0 items-center justify-center rounded-lg p-1 text-zinc-muted transition-colors duration-150 hover:bg-white/5 hover:text-foreground"
          >
            <X className="size-6 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
};
