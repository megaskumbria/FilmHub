"use client";

import { ChevronDown, Plus } from "lucide-react";
import { FlagListItem, FlagCategoryActions } from "@/features";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Input, AccordionItem, AccordionContent } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { type FlagItem, useRenameCategory } from "@/shared/hooks";
import { FlagBadge } from "@/entities";
import { useCreationFlagStore } from "@/features/creation-flag";
import { type MouseEvent } from "react";
import { useShallow } from "zustand/shallow";

interface Props {
  flags: FlagItem[];
  categoryId: string;
  categoryName: string;
}

export const CategoryItem = ({ flags, categoryId, categoryName }: Props) => {
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

  const { flagName, selectedColor, bgOpacity, selectedFont, selectedIcon, category } = flag;
  const { isCreatingNew, editingFlagId } = ui;

  const {
    editingCategoryName,
    editingCategoryId,
    handleStartRename,
    handleConfirmRename,
    handleRenameKeyDown,
    setEditingCategoryName,
    renameInputRef,
    focusInputIfPending,
  } = useRenameCategory();

  const ghostFlag = {
    id: "__new__",
    flagName: flagName || "New flag",
    color: selectedColor,
    bgOpacity,
    fontFamily: selectedFont,
    position: 0,
    categoryId,
    iconId: selectedIcon?.iconName,
    userId: "",
    createdAt: "",
    updatedAt: "",
  };

  const hasOptimisticFlag = flags.some((flag) => flag.id === "__optimistic__");
  const shouldShowGhostFlag = isCreatingNew && category.id === categoryId && !hasOptimisticFlag;
  const isEditing = editingCategoryId === categoryId;

  const handleAddFlag = (category: { name: string; id: string }, e: MouseEvent<HTMLDivElement>) => {
    const accordionItem = e.currentTarget.closest('[data-slot="accordion-item"]');
    const trigger = accordionItem?.querySelector('[data-slot="accordion-trigger"]');

    if (trigger?.getAttribute("data-state") === "open") e.stopPropagation();

    const isSameCategory =
      isCreatingNew && category.id === useCreationFlagStore.getState().flag.category.id;

    if (isSameCategory) {
      cancelCreationFlag();
      return;
    }

    updateStateFlag({
      flagName: "",
      selectedColor: presetColors[0],
      category: { name: category.name, id: category.id },
    });
    updateStateUi({ isCreatingNew: true, editingFlagId: null });
  };

  const isMaxLength = editingCategoryName.length >= 25 && isEditing;

  return (
    <AccordionItem
      key={categoryId}
      value={categoryId}
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
                value={editingCategoryName}
                onBlur={() => void handleConfirmRename(categoryId)}
                onKeyDown={(e) => handleRenameKeyDown(e, categoryId)}
                onChange={(e) => setEditingCategoryName(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "flex-1 min-w-0 bg-transparent border-0 pl-0 rounded-none outline-none text-sm h-8 text-foreground py-0 pr-1",
                  isEditing ? "block" : "hidden",
                )}
                maxLength={25}
              />

              {isMaxLength && <span className="text-xs text-destructive">Max length reached</span>}

              <span className={cn(!isEditing ? "block" : "hidden")}>{categoryName}</span>
            </div>

            <div className="ml-auto flex items-center gap-1.5 shrink-0">
              <FlagCategoryActions
                id={categoryId}
                categoryName={categoryName}
                isEditing={isEditing}
                handleStartRename={handleStartRename}
                onDropdownClose={focusInputIfPending}
              />

              <span className="px-1.5 w-6 h-6 py-0.5 flex items-center justify-center rounded text-sm font-medium tabular-nums text-zinc-muted bg-white/6 border border-border/30">
                {flags.length}
              </span>

              <div
                data-active={category.id === categoryId && isCreatingNew}
                role="button"
                className="w-6 h-6 data-[active=true]:text-accent data-[active=true]:border-accent/40 data-[active=true]:bg-accent/10 flex items-center justify-center shrink-0 rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-colors"
                onClick={(e) => handleAddFlag({ name: categoryName, id: categoryId }, e)}
              >
                <Plus className="size-5" />
              </div>
            </div>

            <ChevronDown className="text-zinc-muted/60 pointer-events-none size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180" />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionContent className="pb-0">
        <ul className="flex flex-col gap-0.5">
          {flags.map((flag, index) => (
            <FlagListItem
              key={flag.id}
              flagItem={flag}
              category={{ name: categoryName, id: categoryId }}
              isActive={editingFlagId === flag.id}
              index={index}
            />
          ))}

          {shouldShowGhostFlag && (
            <li className="hover:bg-white/5 flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all select-none">
              <FlagBadge flagItem={ghostFlag} />
            </li>
          )}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};
