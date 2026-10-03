"use client";

import { ChevronDown, Plus } from "lucide-react";
import { FlagListItem, FlagScaleActions } from "@/features";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Input, Button, AccordionItem, AccordionContent } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { type FlagItem, useRenameScale } from "@/shared/hooks";
import { FlagBadge } from "@/entities";
import { useCreationFlagStore } from "@/features/creation-flag";
import { type MouseEvent } from "react";
import { useShallow } from "zustand/shallow";

const MAX_FLAGS_PER_SCALE = 6;

interface Props {
  flags: FlagItem[];
  scaleId: string;
  scaleName: string;
}

export const ScaleItem = ({ flags, scaleId, scaleName }: Props) => {
  const { flag, ui, presetColors, updateStateFlag, updateStateUi, cancelCreationFlag } =
    useCreationFlagStore(
      useShallow((state) => ({
        flag: state.flag,
        ui: state.ui,
        presetColors: state.presetColors,
        updateStateFlag: state.updateStateFlag,
        updateStateUi: state.updateStateUi,
        cancelCreationFlag: state.cancelCreationFlag,
      })),
    );

  const { flagName, selectedColor, bgOpacity, selectedFont, selectedIcon, scale } = flag;
  const { isCreatingNew, editingFlagId } = ui;

  const {
    editingScaleName,
    editingScaleId,
    handleStartRename,
    handleConfirmRename,
    handleRenameKeyDown,
    setEditingScaleName,
    renameInputRef,
    focusInputIfPending,
  } = useRenameScale();

  const ghostFlag = {
    flagName: flagName || "New flag",
    color: selectedColor,
    bgOpacity,
    fontFamily: selectedFont,
    icon: selectedIcon,
  };

  const isFlagLimitReached = flags.length >= MAX_FLAGS_PER_SCALE;

  const hasOptimisticFlag = flags.some((flag) => flag.id === "__optimistic__");
  const shouldShowGhostFlag = isCreatingNew && scale.id === scaleId && !hasOptimisticFlag;
  const isEditing = editingScaleId === scaleId;

  const handleAddFlag = (
    scale: { name: string; id: string },
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    const accordionItem = e.currentTarget.closest('[data-slot="accordion-item"]');
    const trigger = accordionItem?.querySelector('[data-slot="accordion-trigger"]');

    if (trigger?.getAttribute("data-state") === "open") e.stopPropagation();

    const isSameScale =
      isCreatingNew && scale.id === useCreationFlagStore.getState().flag.scale.id;

    if (isSameScale) {
      cancelCreationFlag();
      return;
    }

    updateStateFlag({
      flagName: "",
      selectedColor: presetColors[0],
      scale: { name: scale.name, id: scale.id },
    });
    updateStateUi({ isCreatingNew: true, editingFlagId: null });
  };

  const isMaxLength = editingScaleName.length >= 25 && isEditing;

  return (
    <AccordionItem
      key={scaleId}
      value={scaleId}
      className="border-b border-border/40 last:border-0"
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger asChild>
          <div
            data-slot="accordion-trigger"
            className="cursor-pointer flex items-center flex-1 min-w-0 group/trigger rounded-none px-2 py-2 text-sm font-medium text-foreground/70 hover:no-underline hover:bg-white/4 hover:text-foreground transition-all gap-2 data-[state=open]:text-foreground "
          >
            <div className="flex flex-col w-full">
              <Input
                ref={renameInputRef}
                value={editingScaleName}
                onBlur={() => void handleConfirmRename(scaleId)}
                onKeyDown={(e) => handleRenameKeyDown(e, scaleId)}
                onChange={(e) => setEditingScaleName(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "flex-1 min-w-0 bg-transparent border-0 pl-0 rounded-none outline-none text-sm h-8 text-foreground py-0 pr-1",
                  isEditing ? "block" : "hidden",
                )}
                maxLength={25}
              />

              {isMaxLength && <span className="text-xs text-destructive">Max length reached</span>}

              <span className={cn(!isEditing ? "block" : "hidden")}>{scaleName}</span>
            </div>

            <div className="ml-auto flex items-center gap-1.5 shrink-0">
              <FlagScaleActions
                id={scaleId}
                scaleName={scaleName}
                isEditing={isEditing}
                handleStartRename={handleStartRename}
                onDropdownClose={focusInputIfPending}
              />

              <span
                data-limit={isFlagLimitReached}
                className="px-1.5 h-6 min-w-6 flex items-center justify-center rounded text-sm font-medium tabular-nums border border-border/30 bg-white/6 text-zinc-muted data-[limit=true]:border-accent/35 data-[limit=true]:bg-accent/10 data-[limit=true]:text-accent"
              >
                {flags.length}/{MAX_FLAGS_PER_SCALE}
              </span>

              <Button
                type="button"
                variant="transparent"
                size="none"
                data-active={scale.id === scaleId && isCreatingNew}
                className="w-6 h-6 data-[active=true]:text-accent data-[active=true]:border-accent/40 data-[active=true]:bg-accent/10 flex items-center justify-center shrink-0 rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-colors"
                onClick={(e) => handleAddFlag({ name: scaleName, id: scaleId }, e)}
                disabled={isFlagLimitReached}
              >
                <Plus className="size-5" />
              </Button>
            </div>

            <ChevronDown className="text-zinc-muted/60 pointer-events-none size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180" />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionContent className="pb-0">
        <div className="flex gap-1">
          <ol aria-hidden className="flex shrink-0 flex-col gap-0.5">
            {Array.from({ length: flags.length + (shouldShowGhostFlag ? 1 : 0) }, (_, index) => (
              <li
                key={index}
                className="flex h-11 w-5 items-center justify-center text-sm font-medium tabular-nums text-zinc-muted select-none"
              >
                {index + 1}
              </li>
            ))}
          </ol>

          <ul className="flex min-w-0 flex-1 flex-col gap-0.5">
            {flags.map((flag, index) => (
              <FlagListItem
                key={flag.id}
                flagItem={flag}
                scale={{ name: scaleName, id: scaleId }}
                isActive={editingFlagId === flag.id}
                index={index}
              />
            ))}

            {shouldShowGhostFlag && (
              <li className="hover:bg-white/5 flex h-11 items-center justify-between gap-2 px-2 rounded-lg cursor-pointer transition-all select-none">
                <FlagBadge flagItem={ghostFlag} />
              </li>
            )}
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
