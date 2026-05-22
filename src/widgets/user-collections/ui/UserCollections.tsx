"use client";

import { Button } from "@/shared/ui";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CreateFolderModal } from "@/widgets";
import { Folder, FolderSkeleton } from "@/entities";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { cn } from "@/shared/lib/utils";
import { useFolders } from "@/shared/hooks";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { IconPlus } from "@tabler/icons-react";

interface UserCollectionsProps {
  setActiveFolder: (folder: number) => void;
  activeFolder: number;
  isMyProfile: boolean;
}

export const UserCollections = ({
  isMyProfile,
  setActiveFolder,
  activeFolder,
}: UserCollectionsProps) => {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const { user } = useAuthStore();
  const { data: folders, isLoading } = useFolders(user.id ?? "");

  const handleNext = () => {
    const swiper = swiperRef.current;
    swiper?.slideNext();
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;
    swiper?.slidePrev();
  };

  const foldersCount = folders?.length ?? 0;

  const isLoop = foldersCount > 10;
  const isHideButtons = foldersCount > 5;

  return (
    <>
      {foldersCount > 0 ?
        <div className="pt-5 pb-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-foreground">My collections</h2>
          </div>

          <div className="flex items-center justify-between gap-8 rounded-xl border border-border bg-surface px-6 py-5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="shrink-0 flex items-center justify-center size-10 rounded-lg bg-accent/10 border border-accent/15">
                <IconPlus className="size-5 text-accent" stroke={2} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">No collections yet</p>
                <p className="text-sm text-muted truncate">
                  Group films into collections — watchlists, favourites, anything.
                </p>
              </div>
            </div>

            {isMyProfile && (
              <CreateFolderModal isEditing={false}>
                <Button variant="accent" size="sm" className="shrink-0 rounded-lg gap-2">
                  <Plus className="size-4" />
                  <span className="text-sm font-medium">New collection</span>
                </Button>
              </CreateFolderModal>
            )}
          </div>
        </div>
      : <>
          <div className="flex items-center justify-between mb-5 pt-5">
            <h2 className="text-lg font-semibold text-foreground">My collections</h2>

            {isMyProfile && (
              <CreateFolderModal isEditing={false}>
                <Button variant="accent" size="sm" className="rounded-lg gap-2">
                  <Plus className="size-4" />
                  <span className="text-sm font-medium">Create</span>
                </Button>
              </CreateFolderModal>
            )}
          </div>

          {isLoading ?
            <div className="flex gap-x-2.5 w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <FolderSkeleton isMyProfile={isMyProfile} key={index} />
              ))}
            </div>
          : <>
              <div
                onMouseEnter={() => setIsNavigationVisible(true)}
                onMouseLeave={() => setIsNavigationVisible(false)}
              >
                <Swiper
                  key={isLoop ? "loop" : "no-loop"}
                  spaceBetween={10}
                  modules={[Navigation]}
                  loop={isLoop}
                  slidesPerView={5}
                  slidesPerGroup={2}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  className="relative min-h-[220px] h-full"
                >
                  {isHideButtons && (
                    <Button
                      onClick={handlePrev}
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center",
                        "size-10 rounded-full p-0",
                        "bg-surface border border-border",
                        "text-muted hover:text-foreground hover:border-accent/50 hover:bg-surface-elevated",
                        "shadow-md transition-all duration-200",
                        isNavigationVisible ? "opacity-100 left-1" : (
                          "opacity-0 -left-2 pointer-events-none"
                        ),
                      )}
                    >
                      <ChevronLeft className="size-5" />
                    </Button>
                  )}

                  {folders?.map((folder, index) => {
                    const { id } = folder;

                    return (
                      <SwiperSlide key={id}>
                        <Folder
                          isMyProfile={isMyProfile}
                          folder={folder}
                          index={index}
                          activeFolder={activeFolder}
                          setActiveFolder={setActiveFolder}
                        />
                      </SwiperSlide>
                    );
                  })}

                  {isHideButtons && (
                    <Button
                      onClick={handleNext}
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center",
                        "size-10 rounded-full p-0",
                        "bg-surface border border-border",
                        "text-muted hover:text-foreground hover:border-accent/50 hover:bg-surface-elevated",
                        "shadow-md transition-all duration-200",
                        isNavigationVisible ? "opacity-100 right-1" : (
                          "opacity-0 -right-2 pointer-events-none"
                        ),
                      )}
                    >
                      <ChevronRight className="size-5" />
                    </Button>
                  )}
                </Swiper>
              </div>
            </>
          }
        </>
      }
    </>
  );
};
