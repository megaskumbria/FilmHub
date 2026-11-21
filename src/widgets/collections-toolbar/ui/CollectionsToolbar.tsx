"use client";

import { useTranslations } from "next-intl";
import { Input, SearchClearButton } from "@/shared/ui";
import { useRef } from "react";
import { IconEye, IconSearch, IconShare3 } from "@tabler/icons-react";
import { type Collection } from "@/shared/hooks";
import { ICONS } from "@/widgets/create-folder-modal";
import { CollectionsToolbarSkeleton } from "./CollectionsToolbarSkeleton";
import { CollectionToolbarActions, LikeCollectionButton, ShareCollectionButton } from "@/features";

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
  const t = useTranslations("collections.toolbar");

  const focusRef = useRef<HTMLInputElement>(null);

  const collection = collections.find((collection) => collection.id === activeCollectionId);

  const {
    collectionName,
    iconName,
    colorHex,
    moviesCount = 0,
    isVisible,
    viewsCount = 0,
    id,
    sharesCount = 0,
  } = collection ?? {};

  const isMediaEmpty = moviesCount === 0;
  const tint = colorHex ?? "var(--accent)";

  const Icon = ICONS.find((icon) => icon.iconName === iconName)?.icon;

  const handleClearSearch = () => {
    setSearchTerm("");
    focusRef.current?.focus();
  };

  return (
    <header className="relative mt-10 mb-6 flex flex-col gap-5 border-t border-border/40 pt-6 lg:flex-row lg:items-center lg:justify-between">
      <div
        className="pointer-events-none absolute -top-6 -left-10 h-32 w-96 max-w-full rounded-full opacity-10 blur-3xl transition-colors duration-500"
        style={{ backgroundColor: tint }}
      />

      {isLoading ?
        <CollectionsToolbarSkeleton />
      : <div className="relative flex min-w-0 max-w-full items-center gap-4">
          <div
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl border transition-colors duration-300"
            style={{
              backgroundColor: `color-mix(in srgb, ${tint} 14%, transparent)`,
              borderColor: `color-mix(in srgb, ${tint} 32%, transparent)`,
            }}
          >
            {Icon && <Icon className="size-7" style={{ color: tint }} />}
          </div>

          <div className="min-w-0">
            <h2
              title={collectionName}
              className="truncate font-unbounded text-lg sm:text-2xl font-semibold tracking-tight text-foreground"
            >
              {collectionName}
            </h2>

            <ul className="mt-1.5 flex items-center gap-4 text-sm text-zinc-muted">
              <li className="font-medium text-zinc-light">{t("items", { count: moviesCount })}</li>

              <li className="flex items-center gap-1.5">
                <IconEye className="size-4" />
                <span className="tabular-nums">{viewsCount}</span>
              </li>

              <li className="flex items-center gap-1.5">
                <IconShare3 className="size-4" />
                <span className="tabular-nums">{sharesCount}</span>
              </li>
            </ul>
          </div>
        </div>
      }

      <div className="relative flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        <search className="group/search relative w-full sm:w-64">
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-muted transition-colors group-focus-within/search:text-accent" />

          <Input
            ref={focusRef}
            type="search"
            value={searchTerm}
            variant="neutral"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && e.currentTarget.blur()}
            placeholder={t("search")}
            className="h-11 rounded-full pl-11 pr-12 text-sm shadow-none placeholder:text-zinc-muted [&::-webkit-search-cancel-button]:hidden focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_15%,transparent)]"
          />

          <SearchClearButton show={!!searchTerm} onClear={handleClearSearch} size={6} />
        </search>

        <div className="flex w-full flex-nowrap items-center gap-2 sm:contents">
          {collection && <LikeCollectionButton collection={collection} />}

          <ShareCollectionButton
            collectionId={id ?? ""}
            userId={userId}
            className="size-11 rounded-full border-border/40 bg-graphite hover:border-accent/40 hover:text-accent data-[state=open]:border-accent/50 data-[state=open]:text-accent sm:order-1"
          />

          {isMyProfile && (
            <div className="ml-auto shrink-0 sm:ml-0">
              <CollectionToolbarActions
                collectionId={activeCollectionId}
                isVisible={isVisible}
                isEditMode={isEditMode}
                isMediaEmpty={isMediaEmpty}
                onToggleEditMode={onToggleEditMode}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
