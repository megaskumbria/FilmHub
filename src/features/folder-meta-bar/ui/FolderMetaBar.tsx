import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CreateFolderModal } from "@/widgets/create-folder-modal";
import { Settings } from "lucide-react";

interface Props {
  name: string;
  count: number;
  isHovered: boolean;
  isMyProfile: boolean;
}

export const FolderMetaBar = ({ name, count, isHovered, isMyProfile }: Props) => {
  return (
    <div className="px-3.5 py-2.5 bg-surface flex items-center justify-between">
      <span className="font-semibold text-foreground text-sm">{name}</span>

      <div className="relative flex items-center shrink-0">
        <span
          className={cn(
            "text-sm text-zinc-muted tabular-nums transition-opacity duration-200",
            isHovered && isMyProfile ? "opacity-0" : "opacity-100",
          )}
        >
          {count}
        </span>

        {isMyProfile && (
          <div
            className={cn(
              "absolute right-0 flex items-center gap-1 transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <CreateFolderModal isEditing={true}>
              <Button
                onClick={(e) => e.stopPropagation()}
                className="size-6 rounded-md flex items-center justify-center text-zinc-muted hover:text-foreground hover:bg-white/10 transition-colors"
              >
                <Settings className="size-4" />
              </Button>
            </CreateFolderModal>
          </div>
        )}
      </div>
    </div>
  );
};
