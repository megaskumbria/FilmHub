import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { IconCamera, IconCrown, IconLock } from "@tabler/icons-react";

export const FolderCustomCover = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />

        <div className="flex items-center gap-1.5 text-xs text-zinc-muted">
          <IconCrown className="size-3 text-amber-400" />
          <span>Premium</span>
        </div>

        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        className={cn(
          "w-full rounded-xl border border-border border-dashed px-4 py-3",
          "flex items-center gap-3",
          "bg-surface hover:bg-surface-elevated transition-colors",
          "group",
        )}
      >
        <div className="size-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <IconCamera className="size-4 text-amber-400" />
        </div>

        <div className="flex flex-col items-start gap-0.5 flex-1">
          <span className="text-sm font-medium text-foreground">Custom cover</span>
          <span className="text-xs text-zinc-muted">Upload your own image for the folder</span>
        </div>
        <IconLock className="size-4 text-zinc-muted group-hover:text-amber-400 transition-colors" />
      </Button>
    </div>
  );
};
