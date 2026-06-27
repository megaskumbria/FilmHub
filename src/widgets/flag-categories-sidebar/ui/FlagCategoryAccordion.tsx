"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/ui";
import { Plus } from "lucide-react";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { IFlagData, useGetFlags, useUpdateFlagPosition } from "@/shared/hooks";
import { FlagCategoriesSkeleton } from "@/widgets/flag-categories-sidebar";
import { FlagListItem } from "@/features";
import { useEffect, useState, type MouseEvent } from "react";
import { isSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { FlagBadge } from "@/entities";

export const FlagCategoryAccordion = () => {
  const [, setLocalFlagsData] = useState<IFlagData[]>([]);

  const {
    setCategory,
    setFlagName,
    flagName,
    presetColors,
    selectedColor,
    bgOpacity,
    selectedFont,
    selectedIcon,
    category,
    isCreatingNew,
    editingFlagId,
    setIsCreatingNew,
    setEditingFlagId,
    cancelCreationFlag,
  } = useCreationFlagStore();

  const ghostFlag = {
    id: "__new__",
    flagName: flagName || "New flag",
    color: selectedColor,
    bgOpacity,
    fontFamily: selectedFont,
    position: 0,
    categoryId: category.id,
    iconId: selectedIcon?.iconName,
    userId: "",
    createdAt: "",
    updatedAt: "",
  };

  const { data: flagsData = [], isLoading } = useGetFlags();

  useEffect(() => setLocalFlagsData(flagsData), [flagsData]);

  const { mutate: updateFlagPosition } = useUpdateFlagPosition();

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;

    const { source } = event.operation;

    if (!isSortable(source)) return;

    const { initialIndex, index, type: categoryId } = source;
    if (initialIndex === index) return;

    setLocalFlagsData((prev) =>
      prev.map((category) => {
        if (category.id !== categoryId) return category;

        const newFlags = [...category.flags];
        const [moved] = newFlags.splice(initialIndex, 1);

        newFlags.splice(index, 0, moved);

        updateFlagPosition({
          categoryId: category.id,
          flagIds: newFlags.map((f) => f.id),
        });

        return { ...category, flags: newFlags };
      }),
    );
  };

  const handleAddFlag = (category: { name: string; id: string }, e: MouseEvent<HTMLDivElement>) => {
    const accordionItem = e.currentTarget.closest('[data-slot="accordion-item"]');
    const trigger = accordionItem?.querySelector('[data-slot="accordion-trigger"]');

    if (trigger?.getAttribute("data-state") === "open") e.stopPropagation();

    const isSameCategory =
      isCreatingNew && category.id === useCreationFlagStore.getState().category.id;

    if (isSameCategory) {
      cancelCreationFlag();
      return;
    }

    setFlagName("", presetColors[0]);
    setCategory(category);
    setIsCreatingNew(true);
    setEditingFlagId(null);
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {isLoading ?
        Array.from({ length: 5 }).map((_, index) => <FlagCategoriesSkeleton key={index} />)
      : flagsData.length === 0 ?
        <div className="py-8 text-center text-xs text-zinc-muted">Nothing found</div>
      : <Accordion type="multiple">
          {flagsData.map(({ id, categoryName, flags }) => {
            const hasOptimisticFlag = flags.some((flag) => flag.id === "__optimistic__");
            const shouldShowGhostFlag = isCreatingNew && category.id === id && !hasOptimisticFlag;

            return (
              <AccordionItem
                key={id}
                value={id}
                className="border-b border-border/40 last:border-0"
              >
                <AccordionTrigger className="rounded-none items-center px-2 py-2 text-sm font-medium text-foreground/70 hover:no-underline hover:bg-white/4 hover:text-foreground transition-all gap-2 data-[state=open]:text-foreground [&>svg]:text-zinc-muted/60 [&[data-state=open]>svg]:text-zinc-muted">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="truncate">{categoryName}</span>

                    <div className="ml-auto flex items-center gap-1.5 shrink-0">
                      <span className="px-1.5 w-6 h-6 py-0.5 flex items-center justify-center rounded text-sm font-medium tabular-nums text-zinc-muted bg-white/6 border border-border/30">
                        {flags.length}
                      </span>

                      <div
                        data-active={category.id === id && isCreatingNew}
                        role="button"
                        className="w-6 h-6 data-[active=true]:text-accent data-[active=true]:border-accent/40 data-[active=true]:bg-accent/10 flex items-center justify-center shrink-0 rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-colors"
                        onClick={(e) => handleAddFlag({ name: categoryName, id }, e)}
                      >
                        <Plus className="size-5" />
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-0">
                  <ul className="flex flex-col gap-0.5">
                    {flags.map((flag, index) => (
                      <FlagListItem
                        key={flag.id}
                        flagItem={flag}
                        category={{ name: categoryName, id }}
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
          })}
        </Accordion>
      }
    </DragDropProvider>
  );
};
