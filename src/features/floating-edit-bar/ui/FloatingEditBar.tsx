"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { Button, Checkbox, Label, Separator } from "@/shared/ui";
import { Trash2, X } from "lucide-react";

interface Props {
  isEditMode: boolean;
  selectedCountsMedia: number;
  totalCountsMedia: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onDelete: () => void;
  onClose: () => void;
  isDeleting: boolean;
}

export const FloatingEditBar = ({
  isEditMode,
  selectedCountsMedia,
  totalCountsMedia,
  isAllSelected,
  onSelectAll,
  onDelete,
  onClose,
  isDeleting,
}: Props) => {
  const t = useTranslations("collections.editBar");
  const isVisible = isEditMode && totalCountsMedia > 0;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-3 duration-300 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div
        className={cn(
          "flex w-max max-w-full flex-nowrap items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.8),0_0_0_1px_rgba(155,86,240,0.12)] max-[400px]:gap-2 max-[400px]:px-3.5",
          isVisible && "pointer-events-auto",
        )}
      >
        <Label
          aria-label={isAllSelected ? t("deselectAll") : t("selectAll")}
          className={cn(
            "shrink-0 text-sm whitespace-nowrap text-zinc-muted transition-colors duration-150",
            isDeleting ?
              "pointer-events-none cursor-not-allowed opacity-50"
            : "cursor-pointer hover:text-foreground",
          )}
        >
          <Checkbox
            checked={isAllSelected}
            className="flex shrink-0 items-center gap-2.5"
            onCheckedChange={onSelectAll}
            disabled={isDeleting}
          />
          <span className="max-[400px]:hidden">
            {isAllSelected ? t("deselectAll") : t("selectAll")}
          </span>
        </Label>

        <Separator orientation="vertical" className="h-4 shrink-0 bg-border" />

        <div className="shrink-0 text-sm whitespace-nowrap text-zinc-muted tabular-nums">
          <span
            className={cn(
              selectedCountsMedia > 0 ? "font-medium text-foreground" : "text-zinc-muted",
            )}
          >
            {selectedCountsMedia}
          </span>

          <span> / {totalCountsMedia}</span>
        </div>

        <Separator orientation="vertical" className="h-4 shrink-0 bg-border" />

        <Button
          onClick={onDelete}
          disabled={selectedCountsMedia === 0}
          className={cn(
            "h-8 shrink-0 gap-1.5 rounded-lg border px-3 text-sm whitespace-nowrap transition-colors duration-200",
            selectedCountsMedia > 0 ?
              "border-destructive/30 bg-destructive/10 text-destructive hover:border-destructive/50 hover:bg-destructive/20"
            : "cursor-not-allowed border-border bg-transparent text-zinc-muted opacity-40",
          )}
        >
          <Trash2 className="size-3.5 shrink-0" />
          <span>{isDeleting ? t("removing") : t("remove")}</span>
        </Button>

        <Separator orientation="vertical" className="h-4 shrink-0 bg-border" />

        <Button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          variant="transparent"
          size="none"
          aria-label={t("close")}
          className="flex shrink-0 items-center justify-center rounded-lg p-1 text-zinc-muted transition-colors duration-150 hover:bg-white/5 hover:text-foreground"
        >
          <X className="size-6 shrink-0" />
        </Button>
      </div>
    </div>
  );
};
