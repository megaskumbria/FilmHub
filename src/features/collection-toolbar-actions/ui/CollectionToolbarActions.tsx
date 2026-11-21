"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { IconCheck, IconLock, IconPencil, IconWorld } from "@tabler/icons-react";
import { useToggleVisibilityCollection } from "@/shared/hooks";

interface Props {
  collectionId: string;
  isVisible?: boolean;
  isEditMode?: boolean;
  isMediaEmpty: boolean;
  onToggleEditMode?: () => void;
}

export const CollectionToolbarActions = ({
  collectionId,
  isVisible,
  isEditMode = false,
  isMediaEmpty,
  onToggleEditMode,
}: Props) => {
  const t = useTranslations("collections.toolbar");
  const { mutate: toggleVisibilityCollection } = useToggleVisibilityCollection();
  const visibilityLabel = isVisible ? t("public") : t("private");
  const editLabel = isEditMode ? t("done") : t("edit");

  return (
    <div className="flex h-11 shrink-0 items-center gap-1 rounded-full border border-border/40 bg-graphite p-1">
      <Button
        type="button"
        onClick={() => toggleVisibilityCollection({ id: collectionId, isVisible: !isVisible })}
        className={cn(
          "h-full gap-1.5 rounded-full px-3.5 transition-colors duration-200 max-[450px]:px-2.5",
          isVisible ?
            "bg-success/10 text-success"
          : "text-zinc-muted hover:bg-surface hover:text-foreground",
        )}
      >
        {isVisible ?
          <IconWorld className="size-4 shrink-0" />
        : <IconLock className="size-4 shrink-0" />}
        <span className="text-sm font-medium whitespace-nowrap max-[450px]:hidden">
          {visibilityLabel}
        </span>
      </Button>

      <Button
        type="button"
        onClick={onToggleEditMode}
        disabled={isMediaEmpty}
        className={cn(
          "h-full gap-1.5 rounded-full px-3.5 whitespace-nowrap select-none transition-colors duration-200 max-[450px]:px-2.5",
          isEditMode && !isMediaEmpty ?
            "bg-accent text-accent-foreground shadow-md shadow-accent/25"
          : "text-zinc-muted hover:bg-surface hover:text-foreground",
        )}
      >
        {isEditMode ?
          <IconCheck className="size-4 shrink-0" />
        : <IconPencil className="size-4 shrink-0" />}
        <span className="text-sm font-medium max-[450px]:hidden">{editLabel}</span>
      </Button>
    </div>
  );
};
