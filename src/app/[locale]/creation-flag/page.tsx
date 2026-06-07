"use client";

import { Button, Separator } from "@/shared/ui";
import {
  FlagCategoriesSidebar,
  FlagNameFontForm,
  FlagPreview,
  // PopularFlagsCarousel,
  PosterUploadSection,
} from "@/widgets";
import { FlagColorPicker } from "@/features";
import { Save } from "lucide-react";

export default function CreationFlagPage() {
  return (
    <div className="max-w-[1640px] w-full px-4 mx-auto pt-20 pb-16">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Create flag</h1>

          <p className="text-base text-zinc-muted mt-1">
            Flags are a graded scale from weak to strong; the category defines what you measure
          </p>
        </div>
      </header>

      <main className="flex gap-4">
        <FlagCategoriesSidebar />

        <FlagColorPicker />

        <div className="flex flex-col gap-4 shrink-0 w-72 flex-1">
          <FlagPreview />
          <FlagNameFontForm />
        </div>

        <PosterUploadSection />
      </main>

      <div className="flex items-center justify-end pt-3">
        <Button variant="accent" size="default" className="gap-2 rounded-lg">
          <Save className="size-4" />
          <span>Save flag</span>
        </Button>
      </div>

      <Separator className="my-8 bg-border/40" />

      {/* <PopularFlagsCarousel /> */}
    </div>
  );
}
