"use client";

import { cn } from "@/shared/lib/utils";
import { Input, Button, Separator } from "@/shared/ui";
import { X, Search, EyeOff, Eye, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FilterPopover, CollectionComments } from "@/widgets";
import { useCollection } from "@/shared/hooks";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";

interface CollectionsToolbarProps {
  activeCollectionId: string;
  isMyProfile: boolean;
  userId: string;
  isEditMode?: boolean;
  onToggleEditMode: () => void;
}

export const CollectionsToolbar = ({
  activeCollectionId,
  isMyProfile,
  userId,
  isEditMode = false,
  onToggleEditMode,
}: CollectionsToolbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollectionVisible, setIsCollectionVisible] = useState(true);

  const focusRef = useRef<HTMLInputElement>(null);

  const { data: collections } = useCollection(userId);
  const collection = collections?.find((collection) => collection.id === activeCollectionId);

  const { collectionName, iconName, colorHex, mediaCount } = collection ?? {};

  const isMediaEmpty = mediaCount === 0;

  const Icon = ICONS.find((icon) => icon.iconName === iconName)?.icon;

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => focusRef.current?.focus(), 150);
    }
  }, [isSearchOpen]);

  const handleOpenInput = () => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) setSearchQuery("");
  };

  return (
    <div className="flex items-center justify-between mb-5 pt-5">
      <div className="flex items-center gap-2 pr-2">
        {collection && Icon && <Icon className="size-5 shrink-0" style={{ color: colorHex }} />}

        <h2 className="text-lg font-bold">{collectionName}</h2>

        <Separator orientation="vertical" className="h-5 bg-border" />

        <span className="text-base font-normal text-foreground">{mediaCount}</span>

        <Separator orientation="vertical" className="h-5 bg-border" />

        {/* <div className="flex items-center gap-1.5">
          <Button className="flex items-center gap-1.5 h-8 px-1 rounded-lg text-zinc-muted hover:text-foreground hover:bg-white/5 transition-colors duration-200">
            <Share2 className="size-3.5 shrink-0" />
            <span className="text-sm tabular-nums">{shared}</span>
          </Button>

          <Button className="flex items-center gap-1.5 h-8 px-1 rounded-lg text-zinc-muted hover:text-rose-400 hover:bg-rose-400/5 transition-colors duration-200">
            <Heart className="size-3.5 shrink-0" />
            <span className="text-sm tabular-nums">{liked}</span>
          </Button>
        </div> */}
      </div>

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
              onClick={() => setIsCollectionVisible((prev) => !prev)}
              className={cn(
                "rounded-lg h-9 p-0 border transition-colors duration-200",
                isCollectionVisible ?
                  "bg-transparent border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
                : "bg-success/10 border-success/30 text-success",
              )}
            >
              {isCollectionVisible ?
                <EyeOff className="shrink-0 size-4" />
              : <Eye className="shrink-0 size-4" />}
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
