"use client";

import { Button } from "@/shared/ui";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FolderMetaBar } from "@/features";
import { IFolder } from "@/shared/hooks";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";

interface FolderProps {
  isMyProfile: boolean;
  folder: IFolder;
  index: number;
  activeFolder: number;
  setActiveFolder: (index: number) => void;
}

export const Folder = ({
  isMyProfile,
  folder,
  index,
  activeFolder,
  setActiveFolder,
}: FolderProps) => {
  const [hoveredFolder, setHoveredFolder] = useState<number | null>(null);

  const { id, iconName, folderName, posters, isVisible, colorHex } = folder;

  const Icon = ICONS.find((i) => i.iconName === iconName)?.icon;

  const isActive = activeFolder === index;
  const isHovered = hoveredFolder === index;

  const fanOut = [
    { x: -26, rot: -8, scale: 0.88 },
    { x: 0, rot: 0, scale: 0.96 },
    { x: 26, rot: 8, scale: 0.88 },
  ];

  const stacked = [
    { x: 0, rot: 0, scale: 0.92 },
    { x: 0, rot: 0, scale: 0.92 },
    { x: 0, rot: 0, scale: 0.92 },
  ];

  const posterTransforms = isHovered || isActive ? fanOut : stacked;

  // console.log("folder", folder);

  return (
    <div
      key={id}
      className="relative pt-3"
      onMouseEnter={() => setHoveredFolder(index)}
      onMouseLeave={() => setHoveredFolder(null)}
    >
      <div
        className="absolute top-0 left-4 h-3 w-16 rounded-t-md border-t border-l border-r bg-surface transition-colors duration-300"
        style={{
          borderColor: isActive ? `${colorHex}99` : `${colorHex}4D`,
        }}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => setActiveFolder(index)}
        className="cursor-pointer relative flex-col shadow-lg items-stretch gap-0 h-auto p-0 rounded-b-xl rounded-tr-xl border overflow-hidden transition-all duration-300 w-full"
        style={{
          borderColor: isActive ? `${colorHex}99` : `${colorHex}4D`,
          boxShadow: isActive ? `0 4px 20px ${colorHex}66` : undefined,
        }}
      >
        <div className="relative h-36 bg-surface overflow-hidden">
          {posters.map((src, i) => {
            const { x, rot, scale } = posterTransforms[i];

            return (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: i === 1 ? 20 : 10 }}
              >
                <div
                  className="relative w-20 h-28 rounded-md overflow-hidden shadow-xl ring-1 ring-white/10 transition-all duration-350 ease-out"
                  style={{
                    transform: `translateX(${x}px) rotate(${rot}deg) scale(${scale})`,
                  }}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </div>
              </div>
            );
          })}

          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `linear-gradient(to top, color-mix(in srgb, ${colorHex} 30%, black) 0%, color-mix(in srgb, ${colorHex} 15%, black) 100%)`,
            }}
          />

          <div className="flex items-center absolute top-2.5 left-2.5 gap-2">
            <div className="size-7 rounded-lg bg-black/40 flex items-center justify-center ring-1 ring-white/10">
              {Icon && <Icon className="size-4" style={{ color: colorHex }} />}
            </div>

            {isMyProfile && (
              <Button className="size-7 rounded-lg bg-black/40 flex items-center justify-center ring-1 ring-white/10">
                {isVisible ?
                  <EyeOff className="size-4" />
                : <Eye className="size-4" />}
              </Button>
            )}
          </div>
        </div>

        <FolderMetaBar
          folder={folder}
          name={folderName}
          count={10}
          isHovered={isHovered}
          isMyProfile={isMyProfile}
        />
      </div>
    </div>
  );
};
