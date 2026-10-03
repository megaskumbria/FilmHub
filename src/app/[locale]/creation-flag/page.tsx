import { Separator } from "@/shared/ui";
import {
  FlagScalesSidebar,
  FlagNameFontForm,
  FlagPreview,
  PopularFlagsCarousel,
  PosterUploadSection,
} from "@/widgets";
import { FlagColorPicker, FloatingCreationFlagBar } from "@/features";

export default function CreationFlagPage() {
  return (
    <div className="max-w-410 w-full px-4 mx-auto pt-20 pb-16">
      <div className="mb-8 flex flex-col">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Create flag</h1>

        <p className="text-base text-zinc-muted mt-1">
          A scale measures one thing; its flags are the levels, from weakest to strongest
        </p>
      </div>

      <main className="flex gap-4 items-start w-full">
        <FlagScalesSidebar />

        <div className="flex-1 min-w-0 grid grid-cols-[minmax(0,1fr)_1fr_auto] gap-4 h-full">
          <FlagColorPicker />

          <div className="flex flex-col gap-4 shrink-0 w-full">
            <FlagPreview />
            <FlagNameFontForm />
          </div>

          <PosterUploadSection />

          <FloatingCreationFlagBar />
        </div>
      </main>

      <Separator className="my-8 bg-border/40" />

      <PopularFlagsCarousel />
    </div>
  );
}

// Emotion gradient — from safe/neutral → anxious → dangerous → horrifying.
// Each scale should have its own color “character”, but within a scale the intensity gradient stays consistent.
// Flags are a graded scale from weak to strong; the scale defines what you measure
