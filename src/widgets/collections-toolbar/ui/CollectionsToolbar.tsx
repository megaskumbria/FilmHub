"use client";

import { cn } from "@/shared/lib/utils";
import { Input, Button, Separator } from "@/shared/ui";
import { X, Clapperboard, Search, EyeOff, Eye, Share2, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FilterPopover, CollectionComments } from "@/widgets";
import { folders } from "@/widgets/user-collections/model/mock-folders";

interface CollectionsToolbarProps {
  activeFolder: number;
}

export const CollectionsToolbar = ({ activeFolder }: CollectionsToolbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollectionVisible, setIsCollectionVisible] = useState(true);

  const focusRef = useRef<HTMLInputElement>(null);

  const currentFolder = folders[activeFolder];
  const { iconColor, name, count, icon: Icon, liked, shared } = currentFolder;

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
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2 pr-2">
        {currentFolder && (
          <div className={cn("shrink-0", iconColor)}>
            <Icon className="size-5" />
          </div>
        )}

        <h2 className={cn("text-lg font-bold", iconColor)}>{name}</h2>

        <Separator orientation="vertical" className="h-5 bg-border" />

        <span className="text-base font-normal text-foreground">{count}</span>

        <Separator orientation="vertical" className="h-5 bg-border" />

        <div className="flex items-center gap-1.5">
          <Button className="flex items-center gap-1.5 h-8 px-1 rounded-lg text-zinc-muted hover:text-foreground hover:bg-white/5 transition-colors duration-200">
            <Share2 className="size-3.5 shrink-0" />
            <span className="text-sm tabular-nums">{shared}</span>
          </Button>

          <Button className="flex items-center gap-1.5 h-8 px-1 rounded-lg text-zinc-muted hover:text-rose-400 hover:bg-rose-400/5 transition-colors duration-200">
            <Heart className="size-3.5 shrink-0" />
            <span className="text-sm tabular-nums">{liked}</span>
          </Button>
        </div>
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
              placeholder="Поиск по коллекции..."
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

        <Button
          size="sm"
          className="transition-colors duration-200 h-9 shrink-0 whitespace-nowrap rounded-lg gap-2 bg-transparent border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
        >
          <Clapperboard className="size-4 shrink-0" />
          <span className="text-sm">Добавить фильм вручную</span>
        </Button>

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

        <Separator orientation="vertical" className="h-5 bg-border" />

        <CollectionComments />
      </div>
    </div>
  );
};
