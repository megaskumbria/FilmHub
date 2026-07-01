"use client";

import { cn } from "@/shared/lib/utils";
import { Button, Checkbox, Label, Separator } from "@/shared/ui";
import { Trash2 } from "lucide-react";

interface Props {
  isEditMode: boolean;
  selectedCountsMedia: number;
  totalCountsMedia: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const FloatingEditBar = ({
  isEditMode,
  selectedCountsMedia,
  totalCountsMedia,
  isAllSelected,
  onSelectAll,
  onDelete,
  isDeleting,
}: Props) => {
  const isVisible = isEditMode && totalCountsMedia > 0;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-surface shadow-[0_8px_32px_-4px_rgba(0,0,0,0.8),0_0_0_1px_rgba(155,86,240,0.12)]">
        <Label
          className={cn(
            "text-sm text-zinc-muted transition-colors duration-150",
            isDeleting ?
              "pointer-events-none opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:text-foreground",
          )}
        >
          <Checkbox
            checked={isAllSelected}
            className="flex items-center gap-2.5"
            onCheckedChange={onSelectAll}
            disabled={isDeleting}
          />
          <span>{isAllSelected ? "Deselect all" : "Select all"}</span>
        </Label>

        <Separator orientation="vertical" className="h-4 bg-border" />

        <div className="text-sm tabular-nums text-zinc-muted">
          <span
            className={cn(
              selectedCountsMedia > 0 ? "text-foreground font-medium" : "text-zinc-muted",
            )}
          >
            {selectedCountsMedia}
          </span>

          <span> / {totalCountsMedia}</span>
        </div>

        <Separator orientation="vertical" className="h-4 bg-border" />

        <Button
          onClick={onDelete}
          disabled={selectedCountsMedia === 0}
          className={cn(
            "h-8 px-3 rounded-lg border text-sm gap-1.5 transition-colors duration-200",
            selectedCountsMedia > 0 ?
              "bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20 hover:border-destructive/50"
            : "bg-transparent border-border text-zinc-muted opacity-40 cursor-not-allowed",
          )}
        >
          <Trash2 className="size-3.5 shrink-0" />
          <span>{isDeleting ? "Removing..." : "Remove"}</span>
        </Button>
      </div>
    </div>
  );
};
