"use client";

import { cn } from "@/shared/lib/utils";
import { Input, Button, Separator } from "@/shared/ui";
import { Search, EyeOff, Eye, Pencil, Heart, Share2 } from "lucide-react";
import { useRef } from "react";
import {
  useToggleLikeCollection,
  useToggleVisibilityCollection,
  type Collection,
} from "@/shared/hooks";
import { ICONS } from "@/widgets/create-folder-modal";
import { CollectionsToolbarSkeleton } from "./CollectionsToolbarSkeleton";
import { IconEye } from "@tabler/icons-react";
import { useRequireAuth } from "@/features/auth";
import { ShareCollectionButton } from "@/features";

interface Props {
  activeCollectionId: string;
  userId: string;
  isMyProfile: boolean;
  isLoading: boolean;
  collections: Collection[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;

  isEditMode?: boolean;
  onToggleEditMode?: () => void;
}

export const CollectionsToolbar = ({
  activeCollectionId,
  userId,
  isMyProfile,
  collections,
  searchTerm,
  setSearchTerm,
  isEditMode = false,
  onToggleEditMode,
  isLoading = false,
}: Props) => {
  const ensureAuth = useRequireAuth();

  const focusRef = useRef<HTMLInputElement>(null);

  const { mutate: toggleVisibilityCollection } = useToggleVisibilityCollection();
  const { mutate: toggleLikeCollection } = useToggleLikeCollection();

  const collection = collections.find((collection) => collection.id === activeCollectionId);

  const {
    collectionName,
    iconName,
    colorHex,
    moviesCount,
    isVisible,
    viewsCount,
    id,
    likesCount,
    isLiked,
    sharesCount,
  } = collection ?? {};

  const isMediaEmpty = moviesCount === 0;

  const Icon = ICONS.find((icon) => icon.iconName === iconName)?.icon;

  const handleToggleLike = () => {
    if (!ensureAuth()) return;
    toggleLikeCollection(id!);
  };

  return (
    <div className="flex items-center justify-between mb-5 pt-5">
      {isLoading ?
        <CollectionsToolbarSkeleton />
      : <div className="flex items-center gap-2 pr-2">
          {collection && Icon && <Icon className="size-5 shrink-0" style={{ color: colorHex }} />}

          <h2 className="text-lg font-bold">{collectionName}</h2>

          <Separator orientation="vertical" className="h-5 bg-border" />

          <span className="text-base font-normal text-foreground">{moviesCount}</span>

          <Separator orientation="vertical" className="h-5 bg-border" />

          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1.5 h-8 px-2 rounded-lg text-zinc-muted">
              <Share2 className="size-5 shrink-0" />
              <span className="text-sm tabular-nums">{sharesCount}</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-zinc-muted">
              <IconEye className="size-5" />
              {viewsCount}
            </div>

            <Button
              onClick={handleToggleLike}
              className={cn(
                "flex items-center gap-1.5 h-8 px-2 rounded-lg transition-colors duration-200",
                isLiked ?
                  "text-rose-400 hover:bg-rose-400/5"
                : "text-zinc-muted hover:text-rose-400 hover:bg-rose-400/5",
              )}
            >
              <Heart className={cn("size-5 shrink-0", isLiked && "fill-rose-400")} />
              <span className="text-sm tabular-nums">{likesCount}</span>
            </Button>
          </div>
        </div>
      }

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out w-52">
            <Input
              ref={focusRef}
              value={searchTerm}
              variant="neutral"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search collections..."
              className="h-9 text-sm rounded-lg border-border bg-surface placeholder:text-zinc-muted"
            />
          </div>

          <Button className="rounded-lg size-9 p-0 flex items-center justify-center border transition-colors duration-200 bg-accent/10 border-accent/30 text-accent">
            <Search className="size-4" />
          </Button>
        </div>

        {isMyProfile && (
          <>
            <Button
              size="sm"
              onClick={() =>
                toggleVisibilityCollection({ id: activeCollectionId, isVisible: !isVisible })
              }
              className={cn(
                "rounded-lg h-9 p-0 border transition-colors duration-200",
                isVisible ?
                  "bg-success/10 border-success/30 text-success"
                : "bg-transparent border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted",
              )}
            >
              {isVisible ?
                <Eye className="shrink-0 size-4" />
              : <EyeOff className="shrink-0 size-4" />}
            </Button>

            <Button
              size="sm"
              onClick={onToggleEditMode}
              disabled={isMediaEmpty}
              className={cn(
                "rounded-lg h-9 px-3 border transition-colors duration-200 gap-1.5 select-none",
                isEditMode && !isMediaEmpty ?
                  "bg-accent/10 border-accent/30 text-accent"
                : "bg-transparent border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted",
              )}
            >
              <Pencil className="shrink-0 size-4" />
              <span className="text-sm">{isEditMode ? "Done" : "Edit"}</span>
            </Button>
          </>
        )}

        <ShareCollectionButton collectionId={id ?? ""} userId={userId} />
        {/* <CollectionComments /> */}
      </div>
    </div>
  );
};
