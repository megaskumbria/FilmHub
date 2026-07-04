"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CreateCollectionModal } from "@/widgets/create-folder-modal";
import { DeleteFolderModal } from "@/features/delete-folder-modal";
import { Loader2, Settings, Trash2 } from "lucide-react";
import { Collection, useDeleteCollection } from "@/shared/hooks";
import { toast } from "sonner";
import { useSkipDeleteConfirm } from "@/shared/hooks";

interface Props {
  name: string;
  isHovered: boolean;
  isMyProfile: boolean;
  collection: Collection;
}

export const FolderMetaBar = ({ collection, name, isHovered, isMyProfile }: Props) => {
  const { mutate: deleteCollection, isPending: isDeleting } = useDeleteCollection();
  const { id, posters, mediaCount } = collection;

  const handleDeleteCollection = () => {
    deleteCollection(id, {
      onSuccess: () => {
        toast.success("Collection deleted successfully", { position: "bottom-left" });
      },

      onError: () => {
        toast.error("Failed to delete collection", { position: "bottom-left" });
      },
    });
  };

  const skipDeleteConfirm = useSkipDeleteConfirm();
  const isForceDelete = posters.length === 0 || skipDeleteConfirm;

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
          {mediaCount}
        </span>

        {isMyProfile && (
          <div
            className={cn(
              "absolute right-0 flex items-center gap-1 transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <CreateCollectionModal isEditing={true} initialData={collection}>
              <Button
                onClick={(e) => e.stopPropagation()}
                className="size-6 rounded-md flex items-center justify-center text-zinc-muted hover:text-foreground hover:bg-white/10 transition-colors"
              >
                <Settings className="size-4" />
              </Button>
            </CreateCollectionModal>

            {/* TODO: FIX DOUBLE BUTTON */}
            {isForceDelete ?
              <Button
                disabled={isDeleting}
                onClick={handleDeleteCollection}
                className="size-6 rounded-md flex items-center justify-center text-zinc-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                {isDeleting ?
                  <Loader2 className="size-4 animate-spin" />
                : <Trash2 className="size-4" />}
              </Button>
            : <DeleteFolderModal onConfirm={handleDeleteCollection} isDeleting={isDeleting}>
                <Button
                  disabled={isDeleting}
                  className="size-6 rounded-md flex items-center justify-center text-zinc-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  {isDeleting ?
                    <Loader2 className="size-4 animate-spin" />
                  : <Trash2 className="size-4" />}
                </Button>
              </DeleteFolderModal>
            }
          </div>
        )}
      </div>
    </div>
  );
};
