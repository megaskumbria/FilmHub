"use client";

import { Accordion } from "@/shared/ui";
import { useGetFlags, useUpdateFlagPosition } from "@/shared/hooks";
import { CategoryItem, FlagCategoriesSkeleton, SortBy } from "@/widgets/flag-categories-sidebar";
import { isSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

interface Props {
  searchQuery: string;
  sortBy: SortBy;
}

export const FlagCategoryAccordion = ({ searchQuery, sortBy }: Props) => {
  const { data: flagsData = [], isLoading } = useGetFlags({ searchQuery, sortBy });

  const { mutate: updateFlagPosition } = useUpdateFlagPosition();

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;

    const { source } = event.operation;
    if (!isSortable(source)) return;

    const categoryId = source.group as string;
    const category = flagsData.find((c) => c.id === categoryId);
    if (!category) return;

    const newFlags = move(category.flags, event);
    if (newFlags === category.flags) return;

    updateFlagPosition({ categoryId, flagIds: newFlags.map((f) => f.id) });
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {isLoading ?
        Array.from({ length: 5 }).map((_, index) => <FlagCategoriesSkeleton key={index} />)
      : flagsData.length === 0 ?
        <div className="py-24 text-center text-sm text-zinc-muted">Nothing found</div>
      : <Accordion type="multiple">
          {flagsData.map(({ id, categoryName, flags }) => (
            <CategoryItem key={id} flags={flags} categoryId={id} categoryName={categoryName} />
          ))}
        </Accordion>
      }
    </DragDropProvider>
  );
};
