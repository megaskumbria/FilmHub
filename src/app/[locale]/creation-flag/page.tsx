"use client";

import { useState } from "react";
import { Separator } from "@/shared/ui";
import { Flame } from "lucide-react";
import "react-fontpicker-ts/dist/index.css";
import {
  FlagCategoriesSidebar,
  FlagNameFontForm,
  FlagPreview,
  PosterUploadSection,
  PopularFlagsCarousel,
} from "@/widgets";
import { FlagColorPicker, FlagIconPicker } from "@/features";
import { ICON_MAP } from "@/shared/model/icons";

export default function CreationFlagPage() {
  const [flagName, setFlagName] = useState("Новый флаг");
  const [selectedColor, setSelectedColor] = useState("#8b5cf6");
  const [selectedIcon, setSelectedIcon] = useState("Flame");
  const [selectedFont, setSelectedFont] = useState("Manrope");

  const SelectedIconComponent = ICON_MAP.find((i) => i.name === selectedIcon)?.icon ?? Flame;

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Создание флага</h1>
        <p className="text-sm text-zinc-muted mt-1">
          Настройте внешний вид и параметры нового флага для вашей коллекции
        </p>
      </header>

      <div className="flex gap-6 items-start">
        <FlagCategoriesSidebar />

        <main className="flex-1 min-w-0 grid grid-cols-[310px_1fr] grid-rows-[auto_auto] gap-4 items-stretch">
          <PosterUploadSection />

          <div className="grid grid-cols-2 gap-4">
            <FlagPreview
              selectedColor={selectedColor}
              selectedFont={selectedFont}
              flagName={flagName}
              SelectedIconComponent={SelectedIconComponent}
            />

            <FlagNameFontForm
              flagName={flagName}
              selectedFont={selectedFont}
              setFlagName={setFlagName}
              setSelectedFont={setSelectedFont}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FlagColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

            <FlagIconPicker
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
              SelectedIconComponent={SelectedIconComponent}
            />
          </div>
        </main>
      </div>

      <Separator className="my-8 bg-border/40" />

      <PopularFlagsCarousel />
    </div>
  );
}
