"use client";

import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import { folders } from "../model/mock-folders";
import { Folder } from "./Folder";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface UserCollectionsProps {
  setActiveFolder: (folder: number) => void;
  activeFolder: number;
}

export const UserCollections = ({ setActiveFolder, activeFolder }: UserCollectionsProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Мои коллекции</h2>

        <Button variant="accent" size="sm" className="rounded-lg gap-2">
          <Plus className="size-4" />
          <span className="text-sm font-medium">Создать</span>
        </Button>
      </div>

      <Swiper spaceBetween={10} loop={true} slidesPerView={5}>
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
      </Swiper>
    </>
  );
};
