import { getTranslations } from "next-intl/server";
import { Separator } from "@/shared/ui";
import {
  FlagScalesSidebar,
  FlagNameFontForm,
  FlagPreview,
  PopularFlagsCarousel,
  PosterUploadSection,
} from "@/widgets";
import { FlagColorPicker, FloatingCreationFlagBar } from "@/features";

export default async function CreationFlagPage() {
  const t = await getTranslations("flags");

  return (
    <div className="max-w-410 w-full px-4 mx-auto pt-20 pb-16">
      <div className="mb-8 flex flex-col">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("title")}</h1>

        <p className="text-base text-zinc-muted mt-1">{t("subtitle")}</p>
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
