"use client";

import { cn } from "@/shared/lib/utils";
import { Button, Checkbox } from "@/shared/ui";
import { Trash2 } from "lucide-react";

interface FloatingEditBarProps {
  isVisible: boolean;
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onDelete: () => void;
}

export const FloatingEditBar = ({
  isVisible,
  selectedCount,
  totalCount,
  isAllSelected,
  onSelectAll,
  onDelete,
}: FloatingEditBarProps) => {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-surface shadow-[0_8px_32px_-4px_rgba(0,0,0,0.8),0_0_0_1px_rgba(155,86,240,0.12)]">
        <button
          onClick={onSelectAll}
          className="flex items-center gap-2.5 text-sm text-zinc-muted hover:text-foreground transition-colors duration-150 cursor-pointer"
        >
          <Checkbox
            checked={isAllSelected}
            className="size-4 border-border bg-surface pointer-events-none"
          />
          <span>{isAllSelected ? "Deselect all" : "Select all"}</span>
        </button>

        <div className="h-4 w-px bg-border" />

        <span className="text-sm tabular-nums text-zinc-muted">
          {selectedCount > 0 ?
            <>
              <span className="text-foreground font-medium">{selectedCount}</span>
              <span> / {totalCount}</span>
            </>
          : <span>0 selected</span>}
        </span>

        <div className="h-4 w-px bg-border" />

        <Button
          onClick={onDelete}
          disabled={selectedCount === 0}
          className={cn(
            "h-8 px-3 rounded-lg border text-sm gap-1.5 transition-colors duration-200",
            selectedCount > 0 ?
              "bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20 hover:border-destructive/50"
            : "bg-transparent border-border text-zinc-muted opacity-40 cursor-not-allowed",
          )}
        >
          <Trash2 className="size-3.5 shrink-0" />
          <span>Remove</span>
        </Button>
      </div>
    </div>
  );
};
