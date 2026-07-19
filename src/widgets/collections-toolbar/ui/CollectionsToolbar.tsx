"use client";

import { cn } from "@/shared/lib/utils";
import { Input, Button, Separator } from "@/shared/ui";
import { X, Search, EyeOff, Eye, Pencil, Share2, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FilterPopover, CollectionComments } from "@/widgets";
import { useToggleVisibilityCollection } from "@/shared/hooks";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { CollectionsToolbarSkeleton } from "./CollectionsToolbarSkeleton";
import { type Collection } from "@/shared/hooks/useCollection";
import { IconEye } from "@tabler/icons-react";

interface Props {
  activeCollectionId: string;
  isMyProfile: boolean;
  isLoading: boolean;
  collections: Collection[];

  isEditMode?: boolean;
  onToggleEditMode?: () => void;
}

export const CollectionsToolbar = ({
  activeCollectionId,
  isMyProfile,
  collections,
  isEditMode = false,
  onToggleEditMode,
  isLoading = false,
}: Props) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const focusRef = useRef<HTMLInputElement>(null);

  const { mutate: toggleVisibilityCollection } = useToggleVisibilityCollection();

  const collection = collections.find((collection) => collection.id === activeCollectionId);

  const { collectionName, iconName, colorHex, moviesCount, isVisible, viewsCount } =
    collection ?? {};

  const isMediaEmpty = moviesCount === 0;

  const Icon = ICONS.find((icon) => icon.iconName === iconName)?.icon;

  useEffect(() => {
    if (isSearchOpen) setTimeout(() => focusRef.current?.focus(), 150);
  }, [isSearchOpen]);

  const handleOpenInput = () => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) setSearchQuery("");
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
            <Button className="flex items-center gap-1.5 h-8 px-1 rounded-lg text-zinc-muted hover:text-foreground hover:bg-white/5 transition-colors duration-200">
              <Share2 className="size-3.5 shrink-0" />
              <span className="text-sm tabular-nums">0</span>
            </Button>

            <Button className="flex items-center gap-1.5 h-8 px-1 rounded-lg text-zinc-muted hover:text-rose-400 hover:bg-rose-400/5 transition-colors duration-200">
              <Heart className="size-3.5 shrink-0" />
              <span className="text-sm tabular-nums">0</span>
            </Button>

            <span className="flex items-center gap-1 text-sm text-zinc-muted">
              <IconEye className="size-4" />
              {viewsCount}
            </span>
          </div>
        </div>
      }

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out",
              isSearchOpen ? "w-52" : "w-0",
            )}
          >
            <Input
              ref={focusRef}
              value={searchQuery}
              variant="neutral"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collections..."
              className="h-9 text-sm rounded-lg border-border bg-surface placeholder:text-zinc-muted"
            />
          </div>

          <Button
            onClick={handleOpenInput}
            className={cn(
              "rounded-lg size-9 p-0 flex items-center justify-center border transition-colors duration-200",
              isSearchOpen ?
                "bg-accent/10 border-accent/30 text-accent"
              : "bg-transparent border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted",
            )}
          >
            {isSearchOpen ?
              <X className="size-4" />
            : <Search className="size-4" />}
          </Button>
        </div>

        <FilterPopover />

        <Separator orientation="vertical" className="h-5 bg-border" />

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
                "rounded-lg h-9 px-3 border transition-colors duration-200 gap-1.5 disabled:pointer-events-none disabled:opacity-50 select-none",
                isEditMode && !isMediaEmpty ?
                  "bg-accent/10 border-accent/30 text-accent"
                : "bg-transparent border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted",
              )}
            >
              <Pencil className="shrink-0 size-4" />
              <span className="text-sm">{isEditMode ? "Done" : "Edit"}</span>
            </Button>

            <Separator orientation="vertical" className="h-5 bg-border" />
          </>
        )}

        <CollectionComments />
      </div>
    </div>
  );
};
