"use client";

import { Button } from "@/shared/ui";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CreateFolderModal } from "@/widgets";
import { folders } from "../model/mock-folders";
import { Folder } from "./Folder";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { cn } from "@/shared/lib/utils";

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

  const handleNext = () => {
    const swiper = swiperRef.current;
    swiper?.slideNext();
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;
    swiper?.slidePrev();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5 pt-5">
        <h2 className="text-lg font-semibold text-foreground">Мои коллекции</h2>

        {isMyProfile && (
          <CreateFolderModal>
            <Button variant="accent" size="sm" className="rounded-lg gap-2">
              <Plus className="size-4" />
              <span className="text-sm font-medium">Создать</span>
            </Button>
          </CreateFolderModal>
        )}
      </div>

      <div
        onMouseEnter={() => setIsNavigationVisible(true)}
        onMouseLeave={() => setIsNavigationVisible(false)}
      >
        <Swiper
          spaceBetween={10}
          modules={[Navigation]}
          loop={true}
          slidesPerView={5}
          slidesPerGroup={2}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="relative min-h-[220px] h-full"
        >
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
              isNavigationVisible ? "opacity-100 left-1" : "opacity-0 -left-2 pointer-events-none",
            )}
          >
            <ChevronLeft className="size-5" />
          </Button>

          {folders.map((folder, index) => {
            const { id } = folder;

            return (
              <SwiperSlide key={id}>
                <Folder
                  folder={folder}
                  index={index}
                  activeFolder={activeFolder}
                  setActiveFolder={setActiveFolder}
                />
              </SwiperSlide>
            );
          })}

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
        </Swiper>
      </div>
    </>
  );
};
