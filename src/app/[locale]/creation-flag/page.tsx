"use client";

import { Button, Separator } from "@/shared/ui";
import {
  FlagCategoriesSidebar,
  FlagNameFontForm,
  FlagPreview,
  PopularFlagsCarousel,
  PosterUploadSection,
} from "@/widgets";
import { FlagColorPicker, FlagIconPicker } from "@/features";
import { Save } from "lucide-react";

export default function CreationFlagPage() {
  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Create flag</h1>

        <p className="text-base text-zinc-muted mt-1">
          Flags are a graded scale from weak to strong; the category defines what you measure
        </p>
      </header>

      <div className="flex gap-6 items-start">
        <FlagCategoriesSidebar />

        <main className="flex-1 min-w-0 grid grid-cols-[320px_1fr] grid-rows-[auto_auto] gap-4 items-stretch">
          <PosterUploadSection />

          <div className="grid grid-cols-2 gap-4">
            <FlagPreview />

            <FlagNameFontForm />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FlagColorPicker />

            <FlagIconPicker />
          </div>

          <div className="col-span-full flex items-center justify-end">
            <Button variant="accent" size="default" className="gap-2 rounded-lg">
              <Save className="size-4" />
              <span>Save flag</span>
            </Button>
          </div>
        </main>
      </div>

      <Separator className="my-8 bg-border/40" />

      <PopularFlagsCarousel />
    </div>
  );
}
