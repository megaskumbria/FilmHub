"use client";

import { Accordion } from "@/shared/ui";
import { IFlagData, useGetFlags, useUpdateFlagPosition } from "@/shared/hooks";
import { CategoryItem, FlagCategoriesSkeleton } from "@/widgets/flag-categories-sidebar";
import { useEffect, useState } from "react";
import { isSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";

export const FlagCategoryAccordion = () => {
  const [, setLocalFlagsData] = useState<IFlagData[]>([]);

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

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {isLoading ?
        Array.from({ length: 5 }).map((_, index) => <FlagCategoriesSkeleton key={index} />)
      : flagsData.length === 0 ?
        <div className="py-8 text-center text-xs text-zinc-muted">Nothing found</div>
      : <Accordion type="multiple">
          {flagsData.map(({ id, categoryName, flags }) => {
            return (
              <CategoryItem key={id} flags={flags} categoryId={id} categoryName={categoryName} />
            );
          })}
        </Accordion>
      }
    </DragDropProvider>
  );
};
